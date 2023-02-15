import { fetchRequestHandler } from "@trpc/server@10.11.1/adapters/fetch";
import { appRouter } from '../../trpc_router.ts';

export function handler(
  request: Request
) {
    return fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });

}




