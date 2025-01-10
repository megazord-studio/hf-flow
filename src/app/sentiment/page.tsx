"use client";

import {useState, useEffect} from "react";
import {Button} from "@/components/ui/button";
import {getModels} from "@/lib/hf/getModels";
import {buildQuery} from "@/lib/hf/buildQuery";
import {fetchSentimentAction} from "./actions";
import {Model} from "@/lib/hf/types/model";
import {ModelQueryClass} from "@/lib/hf/types/modelQuery";

export default function Sentiment() {
    const [models, setModels] = useState<Model[]>([]);
    const [inputText, setInputText] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [sentiment, setSentiment] = useState<string>("");
    const [loadingModels, setLoadingModels] = useState<boolean>(false);
    const [loadingSentiment, setLoadingSentiment] = useState<boolean>(false);

    useEffect(() => {
        const fetchModels = async () => {
            setLoadingModels(true); // Show loading spinner for models
            try {
                const queryParams = new ModelQueryClass("sentiment-analysis", {limit: 7});
                const query = buildQuery(queryParams);
                const fetchedModels = await getModels(query);
                setModels(fetchedModels);
                if (fetchedModels.length > 0) {
                    setSelectedModel(fetchedModels[0].id); // Set default model
                }
            } catch (error) {
                console.error("Error fetching models:", error);
            } finally {
                setLoadingModels(false); // Hide loading spinner for models
            }
        };
        fetchModels();
    }, []);

    const handleSubmit = async () => {
        if (!inputText || !selectedModel) {
            alert("Please enter text and select a model.");
            return;
        }

        setLoadingSentiment(true); // Show loading spinner for sentiment
        try {
            const sentimentLabel = await fetchSentimentAction(inputText, selectedModel);
            setSentiment(sentimentLabel);
        } catch (error) {
            setSentiment(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            setLoadingSentiment(false); // Hide loading spinner for sentiment
        }
    };

    return (
        <div>
            <h1>Sentiment Analysis</h1>

            {/* Text Input */}
            <div style={{marginBottom: "16px"}}>
                <label htmlFor="inputText">Enter Text:</label>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{width: "100%", height: "100px", margin: "8px 0"}}
                />
            </div>

            {/* Model Selector */}
            {loadingModels ? (
                <p>Loading models...</p>
            ) : (
                <div style={{marginBottom: "16px"}}>
                    <label htmlFor="modelSelect">Select Model:</label>
                    <select
                        id="modelSelect"
                        value={selectedModel}
                        onChange={(e) => setSelectedModel(e.target.value)}
                        style={{width: "100%", padding: "8px"}}
                    >
                        {models.map((model) => (
                            <option key={model.id} value={model.id}>
                                {model.modelId}
                            </option>
                        ))}
                    </select>
                </div>
            )}

            {/* Submit Button */}
            <Button onClick={handleSubmit}
                    disabled={loadingSentiment || loadingModels}>
                {loadingSentiment ? "Analyzing..." : "Submit"}
            </Button>

            {/* Sentiment Result */}
            {loadingSentiment ? (
                <p>Analyzing sentiment...</p>
            ) : (
                sentiment && (
                    <div style={{marginTop: "16px"}}>
                        <h2>Sentiment Result</h2>
                        <p>{sentiment}</p>
                    </div>
                )
            )}

            {/* Models Table */}
            <h2>Available Models</h2>
            {loadingModels ? (
                <p>Loading models...</p>
            ) : (
                <table style={{width: "100%", borderCollapse: "collapse"}}>
                    <thead>
                    <tr>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>Name
                        </th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>Author
                        </th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>Downloads
                        </th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>Likes
                        </th>
                        <th style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>Trending Score
                        </th>
                    </tr>
                    </thead>
                    <tbody>
                    {models.map((model) => (
                        <tr key={model.id}>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}>{model.modelId}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}>{model.author}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}>{model.downloads}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}>{model.likes}</td>
                            <td style={{
                                border: "1px solid black",
                                padding: "8px"
                            }}>{model.trendingScore}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
