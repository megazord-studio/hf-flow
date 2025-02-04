type hfConfig = {
    apiURL: string;
    hfToken: string;
}

export const hfConfig: hfConfig = {
    apiURL: "https://api-inference.huggingface.co/models",
    hfToken: process.env.NEXT_PUBLIC_HF_API_TOKEN ?? "",
};
