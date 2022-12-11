import { Params } from "interfaces/query/query";

export type EmailAlreadyExistsService = Params & {
  input: {
    name: string;
    email: string;
    password: string;
  };
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
