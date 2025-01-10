export type ModelQuery = {
    filter: string;
    limit?: number;
    gated?: boolean;
    private?: boolean;
    full?: boolean;
    sort?: string;
    config?: boolean;
    other?: string;
};

export class ModelQueryClass {
    filter: string;
    limit: number = 10;
    gated: boolean = false;
    private: boolean = false;
    full: boolean = true;
    sort: string = "likes";
    config: boolean = true;
    other: string = "endpoint_compatible";

    constructor(filter: string, overrides: Partial<ModelQuery> = {}) {
        this.filter = filter;
        Object.assign(this, overrides);
    }
}
