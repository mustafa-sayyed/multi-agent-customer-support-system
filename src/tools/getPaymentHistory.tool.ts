import { tool } from "langchain";
import z from "zod";
import { logger } from "../utils/logger.js";
import { db } from "../db/sqlite.js";

export const getPaymentHistory = tool(({policyNumber}) => {
    try {
        logger.info(`Fetching payment history for policy number: ${policyNumber}`);
        const sql = "SELECT p.payment_date, p.amount, p.status, p.payment_method FROM payments p JOIN billing b ON p.bill_id = b.bill_id WHERE b.policy_number = ? ORDER BY p.payment_date DESC LIMIT 10";

        const result = db.prepare(sql).all(policyNumber);

        if (result.length === 0) {
            logger.info(`No payment history found with policy number: ${policyNumber}`);
            return `No payment history found with policy number: ${policyNumber}`;
        }
        logger.info(
            `Payment history retrieved successfully for policy number: ${policyNumber}, Result: ${JSON.stringify(result)}`,
        );
        return result;
        
    } catch (error) {
        logger.error("Error fetching payment history:", error);
        return "An error occurred while fetching payment history.";
    }
}, {
    name: "getPaymentHistory",
    description: "Get the payment history of a policy using its policy number",
    schema: z.object({
        policyNumber: z.string().describe("The policy number to retrieve payment history for"),
    }),
})