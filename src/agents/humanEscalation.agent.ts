import { createAgent } from "langchain";
import { HUMAN_ESCALATION_AGENT_PROMPT } from "../prompts/humanEscalation.prompt.js";

export const humanEscalationAgent = createAgent({
	name: "Human Escalation Agent",
	model: "google-genai:gemini-2.5-flash-lite",
	systemPrompt: HUMAN_ESCALATION_AGENT_PROMPT,
});
