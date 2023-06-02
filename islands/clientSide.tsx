import { useSignal } from '@preact/signals'
import { proxy } from '../trpc/proxy.ts'
import { useEffect } from 'preact/hooks'

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
