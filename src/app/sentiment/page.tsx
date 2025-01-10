"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getModels } from "@/lib/hf/getModels";
import { buildQuery } from "@/lib/hf/buildQuery";
import { fetchSentimentAction } from "./actions";
import { Model } from "@/lib/hf/types/model";

export default function Sentiment() {
    const [models, setModels] = useState<Model[]>([]);
    const [inputText, setInputText] = useState("");
    const [selectedModel, setSelectedModel] = useState("");
    const [sentiment, setSentiment] = useState<string>("");

    useEffect(() => {
        const fetchModels = async () => {
            const queryParams = {
                filter: "sentiment-analysis",
                limit: 5,
                gated: false,
                private: false,
                full: true,
                sort: "likes",
                config: true,
            };
            const query = buildQuery(queryParams);
            const fetchedModels = await getModels(query);
            setModels(fetchedModels);
            if (fetchedModels.length > 0) {
                setSelectedModel(fetchedModels[0].id); // Set default model
            }
        };
        fetchModels();
    }, []);

    const handleSubmit = async () => {
        if (!inputText || !selectedModel) {
            alert("Please enter text and select a model.");
            return;
        }

        try {
            const sentimentLabel = await fetchSentimentAction(inputText, selectedModel);
            setSentiment(sentimentLabel);
        } catch (error) {
            console.error(error);
            setSentiment("Error occurred while fetching sentiment.");
        }
    };

    return (
        <div>
            <h1>Sentiment Analysis</h1>
            <div style={{ marginBottom: "16px" }}>
                <label htmlFor="inputText">Enter Text:</label>
                <textarea
                    id="inputText"
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    style={{ width: "100%", height: "100px", margin: "8px 0" }}
                />
            </div>

            <div style={{ marginBottom: "16px" }}>
                <label htmlFor="modelSelect">Select Model:</label>
                <select
                    id="modelSelect"
                    value={selectedModel}
                    onChange={(e) => setSelectedModel(e.target.value)}
                    style={{ width: "100%", padding: "8px" }}
                >
                    {models.map((model) => (
                        <option key={model.id} value={model.id}>
                            {model.modelId}
                        </option>
                    ))}
                </select>
            </div>

            <Button onClick={handleSubmit}>Submit</Button>

            {sentiment && (
                <div style={{ marginTop: "16px" }}>
                    <h2>Sentiment Result</h2>
                    <p>{sentiment}</p>
                </div>
            )}

            <h2>Available Models</h2>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
                <thead>
                <tr>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Name</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Author</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Downloads</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Likes</th>
                    <th style={{ border: "1px solid black", padding: "8px" }}>Trending Score</th>
                </tr>
                </thead>
                <tbody>
                {models.map((model) => (
                    <tr key={model.id}>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{model.modelId}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{model.author}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{model.downloads}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{model.likes}</td>
                        <td style={{ border: "1px solid black", padding: "8px" }}>{model.trendingScore}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}
