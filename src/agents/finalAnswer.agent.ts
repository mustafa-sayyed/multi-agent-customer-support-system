import { createAgent } from "langchain";
import { FINAL_ANSWER_AGENT_PROMPT } from "../prompts/finalAnswerAgent.prompt.js";

export const finalAnswerAgent = createAgent({
    name: "Final Answer Agent",
    model: "google-genai:gemini-2.5-flash-lite",
    systemPrompt: FINAL_ANSWER_AGENT_PROMPT,
})