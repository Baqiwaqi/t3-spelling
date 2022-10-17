import { router, publicProcedure, } from "../trpc";
import { z } from "zod";

export const wordRouter = router({
  createWord: publicProcedure
    .input(z.object({ word: z.string() })).mutation(({ input, ctx }) => {
      return ctx.prisma.word.create({
        data: {
          word: input.word,
        },
      });
    }),
  getAllWords: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.word.findMany();
  }),
  getAllWordLists: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.wordList.findMany({
      include: {
        Word: true,
      },
    });
  }),
  getWordListById: publicProcedure
    .input(z.object({ id: z.string() })).query(({ input, ctx }) => {
      return ctx.prisma.wordList.findUnique({
        where: {
          id: input.id,
        },
        include: {
          Word: true,
        },
      });
    }),
});

