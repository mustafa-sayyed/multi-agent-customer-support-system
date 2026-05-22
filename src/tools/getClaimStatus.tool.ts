import { tool } from "langchain";
import z from "zod";
import { logger } from "../utils/logger.js";
import { db } from "../db/sqlite.js";

export const getClaimStatus = tool(
	({ claimId, policyNumber }) => {
		try {
			if (claimId) {
				const sql = `SELECT c.*, p.policy_type FROM claims c JOIN policies p ON c.policy_number = p.policy_number WHERE c.claim_id = ?`;

				const result = db.prepare(sql).get(claimId);

				if (!result) {
					logger.info(`No claim found with claim ID: ${claimId}`);
					return `No claim found with claim ID: ${claimId}`;
				}
				logger.info(
					`Claim status retrieved successfully for claim ID: ${claimId}, Result: ${JSON.stringify(result)}`,
				);
				return result;
			} else if (policyNumber) {
				const sql = `SELECT c.*, p.policy_type FROM claims c JOIN policies p ON c.policy_number = p.policy_number WHERE c.policy_number = ? ORDER BY c.claim_date DESC LIMIT 3`;

				const result = db.prepare(sql).all(policyNumber);

				if (result.length === 0) {
					logger.info(`No claims found with policy number: ${policyNumber}`);
					return `No claims found with policy number: ${policyNumber}`;
				}
				logger.info(
					`Claim statuses retrieved successfully for policy number: ${policyNumber}, Result: ${JSON.stringify(result)}`,
				);
				return result;
			}
		} catch (error) {
			logger.error("Error fetching claim status:", error);
			return "An error occurred while fetching claim status.";
		}
	},
	{
		name: "getClaimStatus",
		description:
			"Get the status of a claim using its claim ID or policy number",
		schema: z.object({
			claimId: z
				.string()
				.describe("The claim ID to retrieve status for")
				.optional(),
			policyNumber: z
				.string()
				.describe("The policy number to retrieve claim status for")
				.optional(),
		}),
	},
);
