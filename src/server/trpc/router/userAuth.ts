import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { registerUserController } from "server/controllers/authUser/registerUser";
import { verifyAuthStateController } from "server/controllers/authUser/verifyAuthState";
import { generateTokenController } from "server/controllers/globalControllers/generateToken";
import { loginUserController } from "server/controllers/authUser/loginUser";

export const userAuth = router({
  registerUser: publicProcedure
    .input(
      z.object({
        name: z.string(),
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(registerUserController),
  loginUser: publicProcedure
    .input(
      z.object({
        email: z.string().email(),
        password: z.string(),
      })
    )
    .query(loginUserController),
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
