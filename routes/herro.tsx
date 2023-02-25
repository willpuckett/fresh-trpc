import {createTRPCProxyClient,httpBatchLink,loggerLink} from "@trpc/client/";
import type { AppRouter } from '../trpc_router.ts';
import {HandlerContext, PageProps} from "$fresh/server.ts"

interface Data {
    her: {
        greeting: string;
    }
}

export async function handler(req: Request, ctx: HandlerContext) {
    const requrl = new URL(req.url);
    const text =  requrl.searchParams.get("text");

    const url = `${requrl.origin}/trpc`;

    const proxy = createTRPCProxyClient<AppRouter>({
        links: [loggerLink(), httpBatchLink({ url })],
    });

    const her = await proxy.herro.query(text ? {text} : undefined)


    return ctx.render({her})
}

export default function Page({ data }: PageProps<Data>) {
    const { her } = data;
    return (
        <div>
            <form>
                <input type="text" name=""/>
                <button type="submit">Search</button>
            </form>
            <ul>
               {her.greeting}
            </ul>
        </div>
    );
}
