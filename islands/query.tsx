import { trpc } from '../trpc/query.ts'

export default () => {
  const userQuery = trpc.hello.hello.useQuery('id_bilbo')
  const postCreator = trpc.post.createPost.useMutation()
  const postList = trpc.post.listPosts.useQuery()
  console.log(userQuery)
  return (
    <div>
      <p>Success: {userQuery.status}</p>

      <button onClick={() => postCreator.mutate({ title: 'Tinc' })}>
        Create Frodo
      </button>
      <ul>
        {postList.data?.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}
