import inquirer from "inquirer";
import { tool } from "langchain";
import z from "zod";
import { logger } from "../utils/logger.js";

const askQuestionSchema = z.array(
	z.object({
		name: z
			.string()
			.describe(
				"A unique name for this question, used for referencing the answer in later questions.",
			),
		question: z.string().describe("The question you want to ask the user."),
		type: z.enum(["input", "select", "confirm"]).describe("The question type."),
		choices: z
			.array(z.string())
			.describe("The choices for the select question.")
			.optional(),
	}),
);

// .superRefine((questions, ctx) => {
// 	questions.forEach((question, index) => {
// 		if (question.type === "select" && !question.choices?.length) {
// 			ctx.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				message: "Select questions must include a non-empty choices array.",
// 				path: [index, "choices"],
// 			});
// 		}
// 		if (question.type !== "select" && question.choices?.length) {
// 			ctx.addIssue({
// 				code: z.ZodIssueCode.custom,
// 				message: "Choices are only allowed for select questions.",
// 				path: [index, "choices"],
// 			});
// 		}
// 	});
// });

export type AskQuestionInput = z.infer<typeof askQuestionSchema>;

type PromptQuestion =
	| {
			type: "input";
			name: string;
			message: string;
	  }
	| {
			type: "confirm";
			name: string;
			message: string;
	  }
	| {
			type: "select";
			name: string;
			message: string;
			choices: string[];
	  };

export const askQuestion = tool(
	async ({ questions }) => {
		try {
			const prompts: PromptQuestion[] = questions.map(
				(question): PromptQuestion => {
					switch (question.type) {
						case "input":
							return {
								type: "input",
								name: question.name,
								message: question.question,
							};
						case "confirm":
							return {
								type: "confirm",
								name: question.name,
								message: question.question,
							};
						case "select":
							return {
								type: "select",
								name: question.name,
								message: question.question,
								choices: question.choices || [],
							};
					}
				},
			);

			const res = await inquirer.prompt(prompts);

			return res;
		} catch (error) {
			logger.error("Error asking question:", error);
			return "An error occurred while asking the question.";
		}
	},
	{
		name: "askQuestion",
		description:
			"Ask a question to the user. Supported question types are input, select, and confirm. Input expects free text, select provides multiple choices, and confirm expects a yes/no answer.",
		schema: z.object({
			questions: askQuestionSchema,
		}),
	},
);
