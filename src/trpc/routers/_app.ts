import { z } from "zod";
import { baseProcedure, createTRPCRouter, protectedProcedure } from "../init";
import prisma from "@/lib/db";
import { inngest } from "@/inngest/client";

export const appRouter = createTRPCRouter({
  getUsers: protectedProcedure.query(async ( {ctx} ) => {

    console.log("User ID : ", ctx.auth.user.id);
    
    return await prisma.user.findMany({
      where : {
        id : ctx.auth.user.id
      }
    });
  }),

  getWorkflows: protectedProcedure.query(async({ ctx }) => {
    return await prisma.workflow.findMany();
  }),

  createWorkflow : protectedProcedure.mutation(async() => {

    await inngest.send({
      name : "test/hello.world",
      data : {
        email : "Hellopajji@gmail.com"
      }
    })

    return { success : true }
  })
});

// export type definition of API
export type AppRouter = typeof appRouter;
