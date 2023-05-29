import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '../../trpc_router.ts';

export const handler = async (
  request: Request
) => await fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });





