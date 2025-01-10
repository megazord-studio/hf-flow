export type ModelQuery = {
    filter: string;
    limit: number;
    gated: boolean;
    private: boolean;
    full: boolean;
    config: boolean;
    sort: string;
}
