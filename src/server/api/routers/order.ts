import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"
import { env } from "../../../env/server.mjs"
import SendGrid from "@sendgrid/mail"

SendGrid.setApiKey(env.SENDGRID_API_KEY)

export const orderRouter = createTRPCRouter({
  create: publicProcedure
    .input(
      z.object({
        name: z.string(),
        items: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      try {
        await SendGrid.send({
          to: "stephengladney@gmail.com",
          from: "cstoreonlineorders@gmail.com",
          subject: `Online Order #${1}`,
          html: input.items,
        })
        // return ctx.prisma.menu.create({ data: input })
      } catch (e) {
        return e
      }
    }),
})
