import { trpc } from '../trpc/proxy.ts';

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export async function handler (req: Request) {

  await sleep();

  // parallel queries
  await Promise.all([
    //
    trpc.hello.hello.query(),
    trpc.hello.hello.query('client'),
  ]);
  await sleep();

  const postCreate = await trpc.post.createPost.mutate({
    title: 'hello client',
  });

  const postList = await trpc.post.listPosts.query();
  
  console.log('👌');
  return Response.json({postList})
}


