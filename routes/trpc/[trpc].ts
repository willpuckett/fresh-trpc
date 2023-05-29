import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '../../trpc_router.ts';
import { Handler } from "$fresh/server.ts";

export const handler: Handler = (
  request: Request
) => fetchRequestHandler({
      endpoint: '/trpc',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });





