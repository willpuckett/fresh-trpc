import { appRouter } from './trpc_router.ts'

export const caller = appRouter.createCaller({})
