import { connectDB, db, insertSampleData, resetDatabase } from "./db/db.js";
import fs from "fs";

connectDB();
// insertSampleData();

const stmt = db.prepare("SELECT * from customers LIMIT 10");

stmt.all().forEach((row) => {
	// fs.writeFileSync("./output.txt", JSON.stringify(row, null, 2), { flag: "a+" });	
	// console.log(JSON.stringify(row, null, 2));
	console.log(JSON.stringify(row, null, 2));
	
});
