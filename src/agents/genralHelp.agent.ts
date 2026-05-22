import { createAgent } from "langchain";
import { GENERAL_HELP_AGENT_PROMPT } from "../prompts/generalHelpAgent.prompt.js";

export const generalHelpAgent = createAgent({
	name: "General Help Agent",
	model: "google-genai:gemini-2.5-flash-lite",
	systemPrompt: GENERAL_HELP_AGENT_PROMPT,
});
