import { initTRPC } from '@trpc/server'
import { db } from './kvdex.ts'
import { Post } from './kvdex.ts'
import { z } from 'zod'
import { handleCallback, signIn, signOut } from 'kv_oauth'
import { oauth2Client } from '../utils/oauth2_client.ts'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';
// import { getSession } from 'next-auth/react';

// type Context = inferAsyncReturnType<typeof createContext>;
export const createContext =  ({
  req,
  resHeaders, 
}: FetchCreateContextFnOptions) => {
  // const {sessionId} = await handleCallback(req, oauth2Client );
  return {
    req,
    resHeaders,
    // sessionId,
  };
};

const t = initTRPC.context<typeof createContext>().create()

const publicProcedure = t.procedure
const router = t.router

const authRouter = router({
  callback: publicProcedure
    .query(async ({ ctx }) =>  {
    // Return object also includes `accessToken` and `sessionId` properties.
    const { response } = await handleCallback(ctx.req, oauth2Client)
    return response
  }),
  signin: publicProcedure.query(async ({ctx}) => await signIn(ctx.req, oauth2Client)),
  signout: publicProcedure.query(async ({ctx}) => await signOut(ctx.req)),
})
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
  auth: authRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
