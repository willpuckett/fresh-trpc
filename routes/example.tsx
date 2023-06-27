import { trpc } from '../trpc/query.ts'

export default function IndexPage() {
  const userQuery = trpc.post.listPosts.useQuery()
  // getUser.useQery({ id: 'id_bilbo' });
  const userCreator = trpc.post.createPost.useMutation()
  // createUseruseMutation();

  return (
    <div>
      <p>{userQuery.data}</p>

      <button onClick={() => userCreator.mutate({ title: 'Frodo' })}>
        Create Frodo
      </button>
    </div>
  )
}
