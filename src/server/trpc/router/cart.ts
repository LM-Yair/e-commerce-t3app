import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { getUserCartController } from "server/controllers/cart/getUserCart";
import { addProductToCartController } from "server/controllers/cart/addProduct";
import { removeProductFromCartController } from "server/controllers/cart/removeProduct";
import { RemoveAllProuctsFromCartController } from "server/controllers/cart/removeAllProducts";

export const cart = router({
  getUserCart: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(getUserCartController),
  addProduct: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        productId: z.string(),
      })
    )
    .query(addProductToCartController),
  removeProduct: publicProcedure
    .input(
      z.object({
        userId: z.string(),
        productId: z.string(),
      })
    )
    .query(removeProductFromCartController),
  removeAllProducts: publicProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(RemoveAllProuctsFromCartController),
});
