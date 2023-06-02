import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client/'
import type { AppRouter } from './trpc_router.ts'

const where = window.location
  ? window.location?.origin
  : 'https://tropic.deno.dev'
const url = new URL(where)
url.pathname = '/api'
export const proxy = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: url.href })],
})
