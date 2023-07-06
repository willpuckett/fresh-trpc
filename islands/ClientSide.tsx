import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { proxy } from '../trpc/proxy.ts'
import type { inferRouterOutputs } from '@trpc/server'
import type { AppRouter } from '../trpc/router.ts'

type RouterOutput = inferRouterOutputs<AppRouter>

export default function clientSide() {
  const text = useSignal('')
  const posts = useSignal<RouterOutput['post']['list']>([])
  const getData = async () => {
    posts.value = await proxy.post.list.query()
  }
  useEffect(() => {
    getData()
  }, [])
  return (
    <div>
      <input
        class='border-1'
        value={text}
        onInput={(e) => {
          if (e.target instanceof HTMLInputElement) {
            text.value = e.target.value
          }
        }}
      />
      <button
        class='border-1'
        onClick={async () => {
          await proxy.post.create.mutate({ title: text.value })
          text.value = ''
          getData()
        }}
      >
        Create Post
      </button>
      <ul>
        {posts.value.map((post) => (
          <li key={post.id}>
            {post.value.title}{' '}
            <button
              onClick={async () => {
                await proxy.post.delete.mutate(post.id as string)
                getData()
              }}
            >
              ⌫
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
