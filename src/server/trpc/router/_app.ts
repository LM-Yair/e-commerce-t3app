import { router } from "../trpc";

import { user } from "./user";
import { cart } from "./cart";
import { product } from "./product";
import { userAuth } from "./userAuth";

export const appRouter = router({
  user,
  cart,
  userAuth,
  product,
});

// export type definition of API
export type AppRouter = typeof appRouter;
