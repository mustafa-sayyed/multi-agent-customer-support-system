import { createAgent } from "langchain";
import { CLAIMS_AGENT_PROMPT } from "../prompts/claimsAgent.prompt.js";

export const claimsAgent = createAgent({
    name: "Claims Agent",
    model: "google-genai:gemini-2.5-flash-lite",
    systemPrompt: CLAIMS_AGENT_PROMPT,
})