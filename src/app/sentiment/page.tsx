"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { getModels } from "@/lib/hf/getModels";
import { buildQuery } from "@/lib/hf/buildQuery";
import { fetchSentimentAction } from "./actions";
import { Model } from "@/lib/hf/types/model";
import { ModelQueryClass } from "@/lib/hf/types/modelQuery";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectItem,
  SelectLabel,
} from "@/components/ui/select";
import { Container } from "@/components/Container";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        const queryParams = new ModelQueryClass("sentiment-analysis", {
          limit: 7,
        });
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
      const sentimentLabel = await fetchSentimentAction(
        inputText,
        selectedModel
      );
      setSentiment(sentimentLabel);
    } catch (error) {
      setSentiment(
        error instanceof Error ? error.message : "An unknown error occurred"
      );
    } finally {
      setLoadingSentiment(false); // Hide loading spinner for sentiment
    }
  };

  return (
    <Container>
      <h1 className="text-4xl font-extrabold lg:text-5xl border-b pb-2">
        Sentiment Analysis
      </h1>

      {/* Text Input */}
      <div className="mt-8">
        <Textarea
          placeholder="Enter text here..."
          id="inputText"
          value={inputText}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setInputText(e.target.value)
          }
          className="bg-gray-900 w-full h-[300px]"
        />
      </div>

      {/* Model Selector */}
      {loadingModels ? (
        <p>Loading models...</p>
      ) : (
        <div style={{ marginBottom: "16px" }}>
          <label htmlFor="modelSelect">Select Model:</label>
          <Select>
            <SelectTrigger className="w-[380px]">
              <SelectValue placeholder="Select a model" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup
                className="w-[380px] mt-1"
                style={{ maxHeight: "200px", overflowY: "auto" }}
              >
                <SelectLabel>Models</SelectLabel>
                {models.map((model) => (
                  <SelectItem
                    value={model.id}
                    key={model.id}
                    onClick={() => setSelectedModel(model.id)}
                    className="hover:bg-gray-200 p-1 cursor-pointer"
                  >
                    {model.modelId}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      )}

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={loadingSentiment || loadingModels}
      >
        {loadingSentiment ? "Analyzing..." : "Submit"}
      </Button>

      {/* Sentiment Result */}
      {loadingSentiment ? (
        <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Analyzing sentiment...
        </h2>
      ) : (
        sentiment && (
          <div style={{ marginTop: "16px" }}>
            <h3 className="text-2xl font-semibold tracking-tight tranition-colors">
              Sentiment Result
            </h3>
            <p>{sentiment}</p>
          </div>
        )
      )}

      {/* Models Table */}
      <h2 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Available Models
      </h2>
      {loadingModels ? (
        <p>Loading models...</p>
      ) : (
        <Table>
          <TableCaption>Models</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[450px]">Name</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Downloads</TableHead>
              <TableHead className="text-right">Likes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell className="font-medium">{model.id}</TableCell>
                <TableCell>{model.author}</TableCell>
                <TableCell>{model.downloads}</TableCell>
                <TableCell className="text-right">{model.likes}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={3}>Total</TableCell>
              <TableCell className="text-right"> {models.length} </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      )}
    </Container>
  );
}
