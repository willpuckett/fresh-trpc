import {
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
} from "@trpc/client/";
import type { AppRouter } from './trpc_router.ts';


  const url = new URL('https://tropic.deno.dev')
  url.pathname = '/api'

export const trpc = createTRPCProxyClient<AppRouter>({
    links: [loggerLink(), httpBatchLink({ url: url.href })],
  })
