import { router } from "../trpc";
import { userAuth } from "./userAuth";

export const appRouter = router({
  userAuth,
});

// export type definition of API
export type AppRouter = typeof appRouter;
