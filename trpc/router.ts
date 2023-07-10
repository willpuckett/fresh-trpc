import { initTRPC } from '@trpc/server'
import { db } from './kvdex.ts'
import { Post } from './kvdex.ts'
import { z } from 'zod'
import { handleCallback, signIn, signOut, createGitHubOAuth2Client, getSessionId, getSessionAccessToken as _getSessionAccessToken } from 'kv_oauth'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch';

export const oauth2Client = createGitHubOAuth2Client()

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
// type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<typeof createContext>().create()

const publicProcedure = t.procedure
const router = t.router

const authRouter = router({
  callback: publicProcedure
    .query(async ({ ctx }) =>  {
    // Return object also includes `accessToken` and `sessionId` properties.
    console.log('ctx.req.url', ctx.req.headers, '\nctx.resHeaders', ctx.resHeaders)
    const { response } = await handleCallback(ctx.req, oauth2Client)
    console.log('response headers', response.headers)
    return response
  }),
  session: publicProcedure.query(async ({ctx}) => {
    const sessionId = await getSessionId(ctx.req)
    //     const isSignedIn = sessionId !== null
    // const accessToken = isSignedIn
    //   ? await getSessionAccessToken(oauth2Client, sessionId)
    //   : null
    return sessionId
  }),
  signin: publicProcedure.query(async ({ctx}) => {
    console.log('ctx.req.url', ctx.req.headers, '\nctx.resHeaders', ctx.resHeaders)
    const response = await signIn(ctx.req, oauth2Client)
    console.log('response headers', response.headers)
    return response
  }),
  signout: publicProcedure.query(async ({ctx}) => {
    console.log('ctx.req.url', ctx.req.headers, '\nctx.resHeaders', ctx.resHeaders)
    
   const response =  await signOut(ctx.req)
  console.log('response headers', response.headers)
  return response
  }),
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
