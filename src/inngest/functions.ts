import prisma from "@/lib/db";
import { inngest } from "./client";
import { generateText } from "ai";
import { createGoogleGenerativeAI } from "@ai-sdk/google";

const google = createGoogleGenerativeAI();

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event, step }) => {
    await step.sleep("wait-a-moment", "5s");

    // await step.run("create-workflow", async() => {
    //   await prisma.workflow.create({
    //   data : {
    //     name : "test-workflow"
    //   },
    // })
    // })

    const { steps } = await step.ai.wrap("gemini-generate-text", generateText, {
      model: google("gemini-2.5-flash"),
      system: "You are best and very very humorious chef",
      prompt:
        "Tell me how to make best Italian Pizza with puneer sabji and use pizza as breads.",
      experimental_telemetry: {
        isEnabled: true,
        recordInputs: true,
        recordOutputs: true,
      },
    });

    return { steps };
  },
);
