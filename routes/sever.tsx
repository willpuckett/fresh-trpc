import { HandlerContext, PageProps } from '$fresh/server.ts'
import { caller } from '../trpc/caller.ts'

interface Data {
  hello: {
    greeting: string
  }
}

export async function handler(req: Request, ctx: HandlerContext) {
  const text = new URL(req.url).searchParams.get('text')
  const hello = await caller.hello.olleh(text ? { text } : undefined)
  return ctx.render({ hello })
}

export default function Page({ data }: PageProps<Data>) {
  const { hello } = data
  return (
    <div>
      <form>
        <input class='border-1' type='text' name='text' />
        <button class='border-1' type='submit'>Say my name!</button>
      </form>
      <ul>
        {hello.greeting}
      </ul>
    </div>
  )
}
