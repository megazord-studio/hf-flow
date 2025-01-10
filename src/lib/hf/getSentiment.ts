import { hfConfig } from "@/lib/hf/hfConfig";

type Sentiment = {
    label: string;
    score: number;
}[][];

async function fetchSentiment(text: string, model: string): Promise<Response> {
    return fetch(`${hfConfig.apiURL}/${model}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${hfConfig.hfToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
    });
}

export async function getSentiment(text: string, model: string): Promise<string> {
    const maxRetries = 2;
    let response: Response | null = null;

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
        response = await fetchSentiment(text, model);
        if (response.ok) break;
    }

    if (!response || !response.ok) {
        const errorData = await response?.json().catch(() => ({ error: "Unknown error" }));
        throw new Error(`Failed to fetch sentiment: ${errorData.error}`);
    }

    const result: Sentiment = await response.json();
    return result[0][0]?.label || "Unknown";
}
