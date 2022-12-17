import { Params } from "interfaces/query/query";
import { UserRegisterType } from "interfaces/user/user";
import { encrypt } from "utils/server/encryption";

export type SaveUserService = Params & {
  input: UserRegisterType;
};

export const saveUserService = async ({ ctx, input }: SaveUserService) => {
  try {
    const passwordHashed = await encrypt(input.password, 10);
    const savedUser = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: passwordHashed,
      },
    });
    return savedUser;
  } catch (e) {
    throw e;
  }
};
