import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { createProductControlller } from "server/controllers/product/create";
import { getProductListToHomePageController } from "server/controllers/product/get";
import { getToProductPageController } from "server/controllers/product/getProductToPage";

export const product = router({
  create: publicProcedure
    .input(
      z.object({
        name: z.string().min(5),
        price: z.number().positive(),
        inventary: z.number().positive(),
        description: z.string().min(10),
        jwt: z.string(),
      })
    )
    .query(createProductControlller),
  productListToHomePage: publicProcedure.query(
    getProductListToHomePageController
  ),
  getToProductPage: publicProcedure
    .input(z.object({ slug: z.string() }))
    .query(getToProductPageController),
});
