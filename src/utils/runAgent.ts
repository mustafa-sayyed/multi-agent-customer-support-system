import type { ClientTool, ServerTool } from "@langchain/core/tools";
import { createAgent } from "langchain";
import { ChatGoogle } from "@langchain/google";

export const runAgent = async (
	systemPrompt: string,
	prompt: string,
	model?: ChatGoogle,
	tools?: (ClientTool | ServerTool)[],
	agentName?: string,
) => {
	const result = await createAgent({
		model: model || new ChatGoogle({ model: "gemini-2.5-flash-lite" }),
		tools: tools || [],
		name: agentName || "",
	}).invoke({
		messages: [
			{
				role: "system",
				content: systemPrompt,
			},
			{
				role: "user",
				content: prompt,
			}
		],
	});

	return result.messages.at(-1)?.content;
};
