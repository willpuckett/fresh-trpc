import { fetchRequestHandler } from "@trpc/server/adapters/fetch";
import { appRouter } from '../../trpc/trpc_router.ts';
// import { Handler } from "$fresh/server.ts";

export function handler (request: Request) { 
  return fetchRequestHandler({
      endpoint: '/api',
      req: request,
      router: appRouter,
      createContext: () => ({}),
    });
  }




