import {Button} from "@/components/ui/button";
import {getSentiment} from "@/lib/hf/getSentiment";
import {getModels} from "@/lib/hf/getModels";


export default async function Home() {
    const model = "ProsusAI/finbert"
    const sentimentLabel = await getSentiment("I love Hugging Face", model);
    const query = "?filter=sentiment-analysis&limit=5&full=true&config=true"
    const models = await getModels(query);

    return (
        <>
            <Button>{sentimentLabel}</Button>
            <h2>Models</h2>
            <table style={{width: "100%", borderCollapse: "collapse"}}>
                <thead>
                <tr>
                    <th style={{
                        border: "1px solid black",
                        padding: "8px"
                    }}>Model ID
                    </th>
                    <th style={{
                        border: "1px solid black",
                        padding: "8px"
                    }}>Likes
                    </th>
                    <th style={{
                        border: "1px solid black",
                        padding: "8px"
                    }}>Downloads
                    </th>
                    <th style={{
                        border: "1px solid black",
                        padding: "8px"
                    }}>Tags
                    </th>
                    <th style={{
                        border: "1px solid black",
                        padding: "8px"
                    }}>Pipeline Tag
                    </th>
                </tr>
                </thead>
                <tbody>
                {models.map((model: any) => (
                    <tr key={model.id}>
                        <td style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>{model.id}</td>
                        <td style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>{model.likes}</td>
                        <td style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>{model.downloads}</td>
                        <td style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>
                            {model.tags?.join(", ")}
                        </td>
                        <td style={{
                            border: "1px solid black",
                            padding: "8px"
                        }}>{model.pipeline_tag}</td>
                    </tr>
                ))}
                </tbody>
            </table>
        </>
    );
}
