import { hfConfig } from "./hfConfig";
import {Model} from "@/lib/hf/types/model";

export async function getModels(query: string): Promise<Model[]> {
    const response = await fetch(`https://huggingface.co/api/models?${query}`, {
        headers: {
            Authorization: `Bearer ${hfConfig.hfToken}`,
            "Content-Type": "application/json",
        }
    });
    console.log(`Bearer ${hfConfig.hfToken}`)
    if (!response.ok) {
        await response.json().then((data) => {
            console.error(data.error);
            throw new Error("Failed to fetch models");
        });
    }
    return await response.json();
}