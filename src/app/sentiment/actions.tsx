"use server";

import {getSentiment} from "@/lib/hf/getSentiment";

export async function fetchSentimentAction(inputText: string, modelId: string): Promise<string> {
    if (!inputText || !modelId) {
        throw new Error("Input text and model ID are required.");
    }

    try {
        return await getSentiment(inputText, modelId);
    } catch (error) {
        throw new Error(`Error fetching sentiment: ${error}`);
    }
}
