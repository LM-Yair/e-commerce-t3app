import { router } from "../trpc";
import { product } from "./product";
import { userAuth } from "./userAuth";

export const appRouter = router({
  userAuth,
  product,
});

// export type definition of API
export type AppRouter = typeof appRouter;
