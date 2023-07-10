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

export const oauth2Client = createGitHubOAuth2Client({
  clientId: Deno.env.get('GITHUB_CLIENT_ID')!,
  clientSecret: Deno.env.get('GITHUB_CLIENT_SECRET')!,
})

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
      console.log('callback ctx', ctx)
      // Return object also includes `accessToken` and `sessionId` properties.
      const { response } = await handleCallback(ctx.req, oauth2Client)
      console.log('callback response ', response)
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
    console.log('signin ctx', ctx)
    const response = await signIn(ctx.req, oauth2Client)
    console.log('signin response ', response)
    return response
  }),
  signout: loggedProcedure.query(async ({ ctx }) => {
    console.log('signout ctx', ctx)
    const response = await signOut(ctx.req)
    console.log('signout response ', response)
    ctx.resHeaders.set('location', response.headers.get('location')!)
    ctx.resHeaders.set('set-cookie', response.headers.get('set-cookie')!)
    console.log('signout response headers', ctx.resHeaders)
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
