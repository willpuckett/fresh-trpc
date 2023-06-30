import { signal } from '@preact/signals'
import { trpc } from '../trpc/query.ts'

export default () => {
  const postCreator = trpc.post.create.useMutation()
  const postList = trpc.post.list.useQuery()
  const text = signal("");

  return (
    <div>
      <input class='border-2' value={text} onInput={e => { if (e.target instanceof HTMLInputElement) (text.value = e.target.value)}} />
      <button class='border-1' onClick={() => {
        postCreator.mutate({ title: text.value })
        setTimeout(()=> postList.refetch(), 50)
        }}>
        Create Post
      </button>
      <ul>
        {postList.data?.map((post) => <li key={post.id}>{post.title}</li>)}
      </ul>
    </div>
  )
}
