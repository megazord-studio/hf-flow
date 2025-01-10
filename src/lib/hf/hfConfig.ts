import dotenv from "dotenv";

dotenv.config();

type hfConfig = {
    apiURL: string;
    hfToken: string;
}

export const hfConfig: hfConfig = {
    apiURL: "https://api-inference.huggingface.co/models",
    hfToken: process.env.HF_API_TOKEN || "",
};