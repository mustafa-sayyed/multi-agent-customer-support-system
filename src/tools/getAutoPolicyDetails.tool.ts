import { tool } from "langchain";
import z from "zod";
import { db } from "../db/sqlite.js";
import { logger } from "../utils/logger.js";

export const getAutoPolicyDetails = tool(
	({ policyNumber }) => {
		try {
			const sql =
				"SELECT apd.*, p.policy_type, p.premium_amount FROM auto_policy_details apd JOIN policies p ON apd.policy_number = p.policy_number WHERE apd.policy_number = ?";

			const result = db.prepare(sql).get(policyNumber);

			if (!result) {
				logger.info(
					`No auto policy details found with policy number: ${policyNumber}`,
				);
				return `No auto policy details found with policy number: ${policyNumber}`;
			}

			logger.info(
				`Auto policy details retrieved successfully for policy number: ${policyNumber}, Result: ${JSON.stringify(result)}`,
			);

			return result;
		} catch (error) {
			logger.error("Error fetching auto policy details:", error);
			return "An error occurred while fetching auto policy details.";
		}
	},
	{
		name: "getAutoPolicyDetails",
		description:
			"Get the details of an auto insurance policy using its policy number",
		schema: z.object({
			policyNumber: z
				.string()
				.describe("The policy number to retrieve auto policy details for"),
		}),
	},
);
