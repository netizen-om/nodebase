import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { polar, checkout, portal, usage, webhooks } from "@polar-sh/better-auth"; 
import { polarClient } from "./polar";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword : {
        enabled : true,
        autoSignIn : true,
    },
    plugins : [
        polar({
            client : polarClient,
            createCustomerOnSignUp : true,
            use : [
                checkout({
                    products : [
                        {
                            productId : "f7731fb2-be16-4779-9218-8722f385bd9d",
                            slug : "pro"
                        }
                    ],
                    successUrl : process.env.POLAR_SUCCESS_URL,
                    authenticatedUsersOnly : true,
                }),
                portal()
            ]
        })
    ]
});