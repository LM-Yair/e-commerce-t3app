import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { getUserCartController } from "server/controllers/cart/getUserCart";
import { addProductToCartController } from "server/controllers/cart/addProduct";
import { removeProductFromCartController } from "server/controllers/cart/removeProduct";
import { RemoveAllProuctsFromCartController } from "server/controllers/cart/removeAllProducts";
import { productIsAddedController } from "server/controllers/cart/productIsAdded";

export const cart = router({
  getUserCart: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
      })
    )
    .query(getUserCartController),
  addProduct: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
        productId: z.string(),
      })
    )
    .query(addProductToCartController),
  productIsAdded: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
        productId: z.string(),
      })
    )
    .query(productIsAddedController),
  removeProduct: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
        productId: z.string(),
      })
    )
    .query(removeProductFromCartController),
  removeAllProducts: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
      })
    )
    .query(RemoveAllProuctsFromCartController),
});
