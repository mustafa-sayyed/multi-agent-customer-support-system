import { getInsuranceQACollection } from "../db/chroma.js";
import type { DatasetResponse } from "../types.js";

// We load the insurance FAQ dataset from HuggingFace and add it to ChromaDB to use in the FAQ Agent
export async function processInsuranceDatasetToChroma(
	numberOfQueAns: number = 500,
) {
	const collection = await getInsuranceQACollection();
	for (let i = 0; i < numberOfQueAns; i += 100) {
		const offset = i;
		const dataSetBatchSize = 100;

		try {
			const insuranceDatasetUrl = `https://datasets-server.huggingface.co/rows?dataset=deccan-ai%2FinsuranceQA-v2&config=default&split=train&offset=${offset}&length=${dataSetBatchSize}`;
			const response = await fetch(insuranceDatasetUrl);
			const data = (await response.json()) as DatasetResponse;
			console.log(
				`Fetched Dataset: Batch No: ${offset / 100 + 1}, Addding in Chroma Colleciton...`,
			);

			const ids = data.rows.map(({ row_idx }) => row_idx.toString());
			const documents = data.rows.map(
				(row) => `Question: ${row.row.input}\nAnswer: ${row.row.output}`,
			);
			const metadatas = data.rows.map((row) => ({
				question: row.row.input,
				answer: row.row.output,
			}));

			await collection.add({
				ids,
				documents,
				metadatas,
			});
			console.log(`Batch: ${offset / 100 + 1}, Added successfully in Chroma`);
		} catch (error) {
			console.error(
				`Error adding DataSet to Chroma, DataSet Batch: ${offset / 100 + 1}:`,
				error,
			);
		}
	}
}
