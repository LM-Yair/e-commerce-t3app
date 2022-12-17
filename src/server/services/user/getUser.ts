import { Params } from "interfaces/query/query";
import { User } from "interfaces/user/user";

export type GetUserService = Params & {
  input: {
    email: User["email"];
  };
};

export const getUserService = async ({ ctx, input }: GetUserService) => {
  try {
    const user = await ctx.prisma.user.findUniqueOrThrow({
      where: {
        email: input.email,
      },
    });
    return user;
  } catch (e) {
    throw {
      message: "No existe un usuario con este email.",
    };
  }
};
