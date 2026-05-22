import { createAgent } from "langchain"
import { SUPERVISOR_AGENT_PROMPT } from "../prompts/supervisorAgent.prompt.js"
import { askQuestion } from "../tools/askQuestion.tool.js"
import z from "zod"

const supervisorResponseFormat = z.object({
    nextAgent: z.string().describe("Name of the next agent to handle the query");
    reason: z.string().describe("Reason for choosing the next agent");
})

export const supervisorAgent = createAgent({
    name: "Supervisor Agent",
    model: "google-genai:gemini-2.5-flash-lite",
    systemPrompt: SUPERVISOR_AGENT_PROMPT,
    tools: [askQuestion],
    responseFormat: supervisorResponseFormat,
})