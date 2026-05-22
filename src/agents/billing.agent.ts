import { createAgent } from "langchain";
import { BILLING_AGENT_PROMPT } from "../prompts/billingAgent.prompt.js";

export const billingAgent = createAgent({
	name: "Billing Agent",
	model: "google-genai:gemini-2.5-flash-lite",
	systemPrompt: BILLING_AGENT_PROMPT,
});
