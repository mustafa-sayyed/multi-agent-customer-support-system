import { CloudClient, type Collection } from "chromadb";

const client = new CloudClient({
    apiKey: process.env.CHROMA_API_KEY!,
    tenant: process.env.CHROMA_TENANT!,
    database: process.env.CHROMA_DATABASE!,
});

let insuranceQACollection: Collection | null = null;

export const getInsuranceQACollection = async () => {
	if (!insuranceQACollection) {
		insuranceQACollection = await client.getOrCreateCollection({
			name: "insurance_qa_collection",
		});
	}
	return insuranceQACollection;
};
