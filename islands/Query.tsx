import { signal } from '@preact/signals'
import { trpc } from '../trpc/query.ts'

export default () => {
  const mutation = trpc.post.create.useMutation()
  const { error, isLoading, refetch, data } = trpc.post.list.useQuery()
  const { mutate: removePost, isLoading: removeIsLoading } = trpc.post.delete
    .useMutation()
  const text = signal('')

  return (
    <div>
      <input
        class='border-2'
        value={text}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) text.value = e.target.value
        }}
      />
      <button
        class='border-1'
        onClick={() => {
          mutation.mutate({ title: text.value }, { onSuccess: () => refetch() })
        }}
        disabled={mutation.isLoading}
      >
        Create Post
      </button>
      {isLoading && <div>Loading...</div>}
      {error && <div>Error: {error.message}</div>}
      <ul>
        {data?.map((post) => (
          <li key={post.id}>
            {post.value.title}
            <button
              onClick={() =>
                removePost(post.id as string, { onSuccess: () => refetch() })}
              disabled={removeIsLoading}
            >
              ⌫
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
