import { caller } from '../trpc/caller.ts'

const sleep = (ms = 100) => new Promise((resolve) => setTimeout(resolve, ms))

export const handler = async (req: Request) => {
  await sleep()

  await Promise.all([
    caller.hello.hello(),
    caller.hello.hello('client'),
  ])
  await sleep()

  await caller.post.createPost({
    title: 'hello client',
  })

  const postList = await caller.post.listPosts()

  console.log('👌')
  return Response.json({ postList })
}
