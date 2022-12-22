import { z } from "zod";
import { router, publicProcedure } from "../trpc";

import { userProfileController } from "server/controllers/user/profile";

export const user = router({
  profile: publicProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(userProfileController),
});
