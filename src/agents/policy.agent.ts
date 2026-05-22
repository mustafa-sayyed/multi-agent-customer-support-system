import { createAgent } from "langchain";
import { POLICY_AGENT_PROMPT } from "../prompts/policyAgent.prompt.js";

export const generalHelpAgent = createAgent({
	name: "General Help Agent",
	model: "google-genai:gemini-2.5-flash-lite",
	systemPrompt: POLICY_AGENT_PROMPT,
});
