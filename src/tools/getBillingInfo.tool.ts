import { tool } from "langchain";
import z from "zod";
import { logger } from "../utils/logger.js";
import { db } from "../db/sqlite.js";

export const getBillingInfo = tool(
	({ customerId, policyNumber }) => {
		try {
			if (customerId) {
				logger.info(
					`Fetching billing information for customer ID: ${customerId}`,
				);
				const sql =
					"SELECT b.*, p.premium_amount, p.billing_frequency FROM billing b JOIN policies p ON b.policy_number = p.policy_number WHERE b.policy_number = ? AND b.status = 'pending' ORDER BY b.due_date DESC LIMIT 1";

				const result = db.prepare(sql).get(customerId);

				if (!result) {
					logger.info(
						`No pending billing information found for customer ID: ${customerId}`,
					);
					return `No pending billing information found for customer ID: ${customerId}`;
				}
				logger.info(
					`Billing information retrieved successfully for customer ID: ${customerId}, Result: ${JSON.stringify(result)}`,
				);
				return result;
			} else if (policyNumber) {
				logger.info(
					`Fetching billing information for policy number: ${policyNumber}`,
				);
				const sql =
					"SELECT b.*, p.premium_amount, p.billing_frequency FROM billing b JOIN policies p ON b.policy_number = p.policy_number WHERE b.policy_number = ? AND b.status = 'pending' ORDER BY b.due_date DESC LIMIT 1";

				const result = db.prepare(sql).get(policyNumber);

				if (!result) {
					logger.info(
						`No pending billing information found for policy number: ${policyNumber}`,
					);
					return `No pending billing information found for policy number: ${policyNumber}`;
				}
				logger.info(
					`Billing information retrieved successfully for policy number: ${policyNumber}, Result: ${JSON.stringify(result)}`,
				);
				return result;
			}
		} catch (error) {
			logger.error("Error fetching billing information:", error);
			return "An error occurred while fetching billing information.";
		}
	},
	{
		name: "getBillingInfo",
		description:
			"Get the billing information of a customer using their customer ID or policy number",
		schema: z.object({
			customerId: z
				.string()
				.describe("The customer ID to retrieve billing information for")
				.optional(),
			policyNumber: z
				.string()
				.describe("The policy number to retrieve billing information for")
				.optional(),
		}),
	},
);
