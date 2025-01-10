export type Model = {
    _id: string;
    id: string;
    author: string;
    gated: boolean;
    inference: string;
    lastModified: string;
    likes: number;
    trendingScore: number;
    private: boolean;
    sha: string;
    config: {
        architectures: string[];
        model_type: string;
        tokenizer_config: {
            cls_token: string;
            mask_token: string;
            pad_token: string;
            sep_token: string;
            unk_token: string;
        }
    };
    downloads: number;
    tags: string[];
    pipeline_tag: string;
    library_name: string;
    createdAt: string;
    modelId: string;
    siblings: {
        rfilename: string;
    }[];
};
