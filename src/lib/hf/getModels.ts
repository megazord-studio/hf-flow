import { hfConfig } from "./hfConfig";

export async function getModels(query: string) {
    const response = await fetch(`https://huggingface.co/api/models${query}`, {
        headers: {
            Authorization: `Bearer ${hfConfig.hfToken}`,
            "Content-Type": "application/json",
        }
    });
    if (!response.ok) {
        await response.json().then((data) => {
            console.error(data.error);
            throw new Error("Failed to fetch models");
        });
    }
    return await response.json();
}