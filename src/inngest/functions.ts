import prisma from "@/lib/db";
import { inngest } from "./client";
import { NonRetriableError } from "inngest";


export const executeWorkflow = inngest.createFunction(
  { id: "execute-workflow" },
  { event: "workflows/execute.workflow" },
  async ({ event, step }) => {

    // const workflowId = event.id
    const workflowId = event.data.workflowId;

    if(!workflowId) {
      throw new NonRetriableError("WorkflowID missging")
    }

    const nodes = await step.run("prepare-workflow", async() => {
      const workflow = await prisma.workflow.findUniqueOrThrow({
        where : { id : workflowId },
        include: {
          nodes : true,
          connections : true  
        }
      });

      return workflow.nodes
    })

    return { nodes, workflowId };
  },
);
