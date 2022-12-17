import { Params } from "interfaces/query/query";
import { User } from "interfaces/user/user";

export type EmailAlreadyExistsService = Params & {
  input: Omit<User, "id" | "createdAt" | "updatedAt" | "name" | "password">;
};

export const emailAlreadyExistsService = async ({
  ctx,
  input,
}: EmailAlreadyExistsService): Promise<boolean> => {
  const existEmail = await ctx.prisma.user.findUnique({
    where: { email: input.email },
  });
  return existEmail ? true : false;
};
