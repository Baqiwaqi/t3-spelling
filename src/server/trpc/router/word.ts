import { router, publicProcedure, } from "../trpc";
import { z } from "zod";

export const wordRouter = router({
  createWord: publicProcedure
    .input(z.object({ word: z.string() }))
    .query(({ input, ctx }) => {
      return ctx.prisma.word.create({
        data: {
          word: input.word,
        },
      });
    }),
  getAllWords: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.word.findMany();
  }),
});

