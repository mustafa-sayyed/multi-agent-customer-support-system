import "dotenv/config";
import { connectDB, db, insertSampleData } from "./db/sqlite.js";
import { processInsuranceDatasetToChroma } from "./utils/processInsuranceDatasetToChroma.js";
import { getInsuranceQACollection } from "./db/chroma.js";

// Connect to SQLite database
connectDB();

// Insert sample data(fake) into SQLite DB, make sure run it once
// insertSampleData();

// Test SQLite
const stmt = db.prepare("SELECT * from customers LIMIT 10");
if (stmt.columns().length > 10) {
	console.log("DB Connection Successfull.");
}

// fetch insurance QA dataset from HuggingFace and add it to ChromaDB for FAQ Agent
// processInsuranceDatasetToChroma();

// Test ChromaDB using a query
// const collection = await getInsuranceQACollection();
// collection.query({
// 	queryTexts: ["What is the process to file a claim?"],
// 	nResults: 3,
// }).then((result) => {
// 	console.log("ChromaDB Query Result:", JSON.stringify(result, null, 2));
// }).catch((error) => {
// 	console.error("Error querying ChromaDB:", error);
// });
