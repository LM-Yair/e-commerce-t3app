import { Params } from "interfaces/query/query";
import { SECRET_KEY, TOKEN_EXPIRES_IN } from "CONSTANTS/GLOBALS";
import { UserLoginType } from "interfaces/user/user";
import { createTokenService } from "server/services/globalServices/createToken";
import { getUserService } from "server/services/user/getUser";
import { validatePasswordService } from "server/services/user/validatePassword";

export type SaveUserController = Params & {
  input: UserLoginType;
};

export const loginUserController = async ({
  ctx,
  input,
}: SaveUserController) => {
  try {
    const user = await getUserService({ ctx, input });
    const passwordIsValid = validatePasswordService({
      ctx,
      input: {
        password: input.password,
        passwordHashed: user.password,
      },
    });
    if (!passwordIsValid) {
      throw {
        message: "La contraseña no es correcta.",
      };
    }
    const jwt = createTokenService({
      id: user.id,
      expiresIn: TOKEN_EXPIRES_IN,
      SECRET_KEY,
    });
    return { jwt };
  } catch (e) {
    return {
      error: true,
      message: "Ocurrió un error al tratar de logear al usuario",
      data: e,
    };
  }
};
