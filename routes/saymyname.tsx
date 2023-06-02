import {HandlerContext, PageProps} from "$fresh/server.ts"
import { trpc } from '../trpc/proxy.ts';

interface Data {
    herro: {
        greeting: string;
    }
}

export async function handler(req: Request, ctx: HandlerContext) {
    const text = new URL(req.url).searchParams.get("text");

    const herro = await trpc.hello.olleh.query(text ? {text} : undefined)


    return ctx.render({herro})
}

export default function Page({ data }: PageProps<Data>) {
    const { herro } = data;
    return (
        <div>
            <form>
                <input type="text" name="text"/>
                <button type="submit">Say my name!</button>
            </form>
            <ul>
               {herro.greeting}
            </ul>
        </div>
    );
}
