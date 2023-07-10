import { initTRPC } from '@trpc/server'
import { db } from './kvdex.ts'
import { Post } from './kvdex.ts'
import { z } from 'zod'
import {
  createGitHubOAuth2Client,
  getSessionAccessToken as _getSessionAccessToken,
  getSessionId,
  handleCallback,
  signIn,
  signOut,
} from 'kv_oauth'
import type { FetchCreateContextFnOptions } from '@trpc/server/adapters/fetch'

export const oauth2Client = createGitHubOAuth2Client()

export const createContext = ({
  req,
  resHeaders,
}: FetchCreateContextFnOptions) => {
  // const {sessionId} = await handleCallback(req, oauth2Client );
  return {
    req,
    resHeaders,
    // sessionId,
  }
}
// type Context = inferAsyncReturnType<typeof createContext>;

const t = initTRPC.context<typeof createContext>().create()

const publicProcedure = t.procedure
const router = t.router
const middleware = t.middleware

const loggerMiddleware = middleware(async (opts) => {
  console.log('opts', opts)
  const start = Date.now()
  const result = await opts.next()
  const durationMs = Date.now() - start
  const meta = { path: opts.path, type: opts.type, durationMs }
  result.ok
    ? console.log('OK request timing:', meta)
    : console.error('Non-OK request timing', meta)
  return result
})

const loggedProcedure = publicProcedure.use(loggerMiddleware)

const authRouter = router({
  callback: loggedProcedure
    .query(async ({ ctx }) => {
      // Return object also includes `accessToken` and `sessionId` properties.
      const { response } = await handleCallback(ctx.req, oauth2Client)
      return response
    }),
  session: loggedProcedure.query(async ({ ctx }) => {
    const sessionId = await getSessionId(ctx.req)
    //     const isSignedIn = sessionId !== null
    // const accessToken = isSignedIn
    //   ? await getSessionAccessToken(oauth2Client, sessionId)
    //   : null
    return sessionId
  }),
  signin: loggedProcedure.query(async ({ ctx }) => {
    const response = await signIn(ctx.req, oauth2Client)
    return response
  }),
  signout: loggedProcedure.query(async ({ ctx }) => {
    const response = await signOut(ctx.req)
    return response
  }),
})

const postRouter = router({
  create: loggedProcedure
    .input(Post)
    .mutation(async ({ input }) => {
      const post = await db.posts.add(input)
      return post
    }),
  list: loggedProcedure.query(async () => await db.posts.getMany()),
  delete: loggedProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.posts.delete(input)
  }),
})

export const appRouter = router({
  auth: authRouter,
  post: postRouter,
})

export type AppRouter = typeof appRouter
