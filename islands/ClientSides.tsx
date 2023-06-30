import { useSignal } from '@preact/signals'
import { useEffect } from 'preact/hooks'
import { proxy } from '../trpc/proxy.ts'

export default function clientSide() {
  const hello = useSignal('')
  useEffect(() => {
    const getData = async () => {
      const tiny = await proxy.hello.hello.query('Micky')
      console.log(tiny)
      hello.value = tiny
    }
    getData()
  })
  return (
    <div class='flex gap-2 w-full'>
      Hello Value: {hello}.
    </div>
  )
}
