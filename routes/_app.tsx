// routes/_app.tsx
import { Footer, Nav } from '../components/Nav.tsx'
import { AppProps } from '$fresh/server.ts'
import Provider from '../islands/Provider.tsx'

export default ({ Component, url }: AppProps) => {
  return (
    <>
      <div class='m-auto max-w-screen-md lg:max-w-screen-xl'>
        <Nav active={url.pathname} />
        <Provider>
          <div class='p-4 md:p-6 mt-4'>
            <Component />
          </div>
        </Provider>
        <Footer />
      </div>
    </>
  )
}
