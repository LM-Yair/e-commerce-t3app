import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { saveUserController } from "server/controllers/authUser/saveUser";
import { verifyAuthStateController } from "server/controllers/authUser/verifyAuthState";
import { generateTokenController } from "server/controllers/globalControllers/generateToken";

export const userAuth = router({
  saveUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(saveUserController),
  generateToken: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(generateTokenController),
  verifyAuth: publicProcedure
    .input(
      z.object({
        jwt: z.string(),
      })
    )
    .query(verifyAuthStateController),
});
