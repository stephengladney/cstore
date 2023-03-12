import { z } from "zod"
import { createTRPCRouter, publicProcedure } from "../trpc"

export const userRouter = createTRPCRouter({
  get: publicProcedure
    .input(z.object({ id: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findFirst({ where: input })
    }),
  getByEmail: publicProcedure
    .input(z.object({ email: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.user.findFirst({ where: input })
    }),
})
