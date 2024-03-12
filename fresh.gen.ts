// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_app from './routes/_app.tsx'
import * as $api_trpc_ from './routes/api/[trpc].ts'
import * as $api_oauth from './routes/api/oauth.ts'
import * as $api_signin from './routes/api/signin.ts'
import * as $api_signout from './routes/api/signout.ts'
import * as $client from './routes/client.tsx'
import * as $index from './routes/index.tsx'
import * as $query from './routes/query.tsx'
import * as $server from './routes/server.tsx'
import * as $ClientSide from './islands/ClientSide.tsx'
import * as $Provider from './islands/Provider.tsx'
import * as $Query from './islands/Query.tsx'
import { type Manifest } from '$fresh/server.ts'

const manifest = {
  routes: {
    './routes/_app.tsx': $_app,
    './routes/api/[trpc].ts': $api_trpc_,
    './routes/api/oauth.ts': $api_oauth,
    './routes/api/signin.ts': $api_signin,
    './routes/api/signout.ts': $api_signout,
    './routes/client.tsx': $client,
    './routes/index.tsx': $index,
    './routes/query.tsx': $query,
    './routes/server.tsx': $server,
  },
  islands: {
    './islands/ClientSide.tsx': $ClientSide,
    './islands/Provider.tsx': $Provider,
    './islands/Query.tsx': $Query,
  },
  baseUrl: import.meta.url,
} satisfies Manifest

export default manifest
