import { Params } from "interfaces/query/query";

type UserProfileService = Params & {
  input: {
    id: string;
  };
};
export const userProfileService = async ({
  ctx,
  input,
}: UserProfileService) => {
  try {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        id: input.id,
      },
      select: {
        name: true,
        createdAt: true,
      },
    });
    return user;
  } catch (e) {
    throw e;
  }
};
