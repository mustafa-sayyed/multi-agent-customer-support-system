import { tool } from "langchain";
import z from "zod";
import { db } from "../db/sqlite.js";
import { logger } from "../utils/logger.js";

export const getPolicyDetails = tool(
	({ policyNumber }) => {
		try {
			logger.info(`Fetching details for policy number: ${policyNumber}`);
			const result = db
				.prepare(
					"SELECT p.*, c.first_name, c.last_name FROM policies p JOIN customers c ON p.customer_id = c.customer_id WHERE p.policy_number = ?",
				)
				.get(policyNumber);

			if (!result) {
				logger.info(`No policy found with policy number: ${policyNumber}`);
				return `No policy found with policy number: ${policyNumber}`;
			}
			logger.info(
				`Policy details retrieved successfully for policy number: ${policyNumber}, Result: ${JSON.stringify(result)}`,
			);

			return result;
		} catch (error) {
			logger.error("Error fetching policy details:", error);
			return "An error occurred while fetching policy details.";
		}
	},
	{
		name: "getPolicyDetails",
		description: "Get the details of a policy using its policy number",
		schema: z.object({
			policyNumber: z
				.string()
				.describe("The policy number to retrieve details for"),
		}),
	},
);
