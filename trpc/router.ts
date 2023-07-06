import { initTRPC } from '@trpc/server'
import { db } from './kvdex.ts'
import { Post } from './kvdex.ts'
import { z } from 'zod'

const t = initTRPC.create()

const publicProcedure = t.procedure
const router = t.router

const postRouter = router({
  create: publicProcedure
    .input(Post)
    .mutation(async ({ input }) => {
      const post = await db.posts.add(input)
      return post
    }),
  list: publicProcedure.query(async () => await db.posts.getMany()),
  delete: publicProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.posts.delete(input)
  }),
})

export const appRouter = router({
  post: postRouter,
})

export type AppRouter = typeof appRouter
