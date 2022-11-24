import {saveUserController, verifyAuthStateController} from "server/controllers/userAuth";
import {z} from "zod";
import { router, publicProcedure } from "../trpc";

export const userAuth = router({
  saveUser: publicProcedure
    .input(z.object({ 
      name: z.string(),
      email: z.string().email(),
      password: z.string(),
    }))
    .query( saveUserController ),
  verifyAuth: publicProcedure
    .input(z.object({
      id: z.string(),
      name: z.string(),
      email: z.string(),
      createdAt: z.date(),
      updatedAt: z.date(),
      password: z.string(),
      jwt: z.string(),
    }))
    .query( verifyAuthStateController ),
});
