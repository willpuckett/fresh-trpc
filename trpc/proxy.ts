import { createTRPCProxyClient, httpBatchLink, loggerLink } from '@trpc/client'
import type { AppRouter } from './router.ts'
import { url } from './url.ts'

export const proxy = createTRPCProxyClient<AppRouter>({
  links: [
    loggerLink(),
    httpBatchLink({
      url, // headers: () => {
      //   return {
      //   'content-type': 'application/json',
      // }
      // },
    }),
  ],
})
