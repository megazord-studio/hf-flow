import { hfConfig } from "@/lib/hf/hfConfig";

type Sentiment = {
    label: string;
    score: number;
}[][];

export async function getSentiment(text: string, model: string): Promise<string> {
    const response = await fetch(`${hfConfig.apiURL}/${model}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${hfConfig.hfToken}`,
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ inputs: text }),
    });

    if (!response.ok) {
        await response.json().then((data) => {
            console.error(data.error);
            throw new Error("Failed to fetch sentiment");
        });
    }

    const result: Sentiment = await response.json();
    return result[0][0].label;
}
