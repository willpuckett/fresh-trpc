import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '../../trpc_router.ts';

export const handler = (
  request: Request
) => fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });





