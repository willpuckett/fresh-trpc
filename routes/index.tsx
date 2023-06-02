// import { trpc } from '../trpc/proxy.ts';
import  {caller} from '../trpc/trpc_router.ts';

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms));

export async function handler (req: Request) {

  await sleep();

  // parallel queries
  await Promise.all([
    //
     caller.hello.hello(),
    caller.hello.hello('client'),
  ]);
  await sleep();

  const postCreate = await caller.post.createPost({
    title: 'hello client',
  });

  const postList = await caller.post.listPosts();
  
  console.log('👌');
  return Response.json({postList})
}


