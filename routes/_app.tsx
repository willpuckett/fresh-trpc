// routes/_app.tsx
import Nav, {Footer} from '../components/Nav.tsx'
import { AppProps } from '$fresh/server.ts'
import Provider from '../islands/Provider.tsx'

export default ({ Component, url }: AppProps) => {
  return (
    <>
    <Nav active={url.pathname}/>
    <Provider>
      <div class='m-auto max-w-screen-md lg:max-w-screen-xl'>
        <div class='p-4 md:p-6 mt-4'>
          <Component />
        </div>
      </div>
    </Provider>
    <Footer />
    </>
  )
}
