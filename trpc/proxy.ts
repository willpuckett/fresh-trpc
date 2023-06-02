import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client/'
import type { AppRouter } from './trpc_router.ts'

const url = new URL(location?.origin ?? 'https://tropic.deno.dev')
url.pathname = '/api'
export const proxy = createTRPCProxyClient<AppRouter>({
  links: [loggerLink(), httpBatchLink({ url: url.href })],
})
