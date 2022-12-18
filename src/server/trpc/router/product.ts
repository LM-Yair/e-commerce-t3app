import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import {createProductControlller} from "server/controllers/product/create";

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
});
