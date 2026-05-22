import { MessagesValue, StateSchema } from "@langchain/langgraph";
import z from "zod";

export const state = new StateSchema({
	messages: MessagesValue,
    conversationHistory: z.string().optional(),
    userInput: z.string().optional(),

    // User related extracted fields
    userIntent: z.string().optional(),
    policyNumber: z.string().optional(),
    claimId: z.string().optional(),
    customerId: z.string().optional(),

    // Supervisor agent handles these fields
	nextAgent: z.string().optional(),
	reasonForNextAgent: z.string().optional(),
	task: z.string().optional(),

    // Human escalation related fields
    requireHumanEscalation: z.boolean().optional(),
    escalationReason: z.string().optional(),

    // Billing related information
    billingAmount: z.number().optional(),
    paymentMethod: z.string().optional(),
    billingFrequency: z.string().optional(),
    invoiceDate: z.string().optional(),

    timestamp: z.string().optional(),
    finalAnswer: z.string().optional(),
});