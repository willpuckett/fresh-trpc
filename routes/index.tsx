import {
  createTRPCProxyClient,
  httpBatchLink,
  loggerLink,
} from "@trpc/client/";
import type { AppRouter } from '../trpc_router.ts';

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export async function handler (req: Request) {
  // const requrl = new URL(req.url);

  // const url = `${requrl.origin}/trpc`;

  const url = new URL(req.url)
  url.pathname = '/trpc'

  const proxy = createTRPCProxyClient<AppRouter>({
    links: [loggerLink(), httpBatchLink({ url: url.href })],
  });

  await sleep();

  // parallel queries
  // await Promise.all([
  //   //
  //   proxy.hello.query(),
  //   proxy.hello.query('client'),
  // ]);
  // await sleep();

  const postCreate = await proxy.post.createPost.mutate({
    title: 'hello client',
  });

  const postList = await proxy.post.listPosts.query();
  
  console.log('👌');
  return Response.json({postList})
}


