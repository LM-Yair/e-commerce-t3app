import { router } from "../trpc";

import { user } from "./user";
import { product } from "./product";
import { userAuth } from "./userAuth";

export const appRouter = router({
  user,
  userAuth,
  product,
});

// export type definition of API
export type AppRouter = typeof appRouter;
