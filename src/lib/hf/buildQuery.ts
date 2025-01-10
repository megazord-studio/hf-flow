import {ModelQuery} from "@/lib/hf/types/modelQuery";

export function buildQuery(query: ModelQuery): string {
    return Object.entries(query)
        .filter(([, value]) => value !== undefined && value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join("&");
}
