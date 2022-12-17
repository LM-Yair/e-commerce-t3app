import {SECRET_KEY, TOKEN_EXPIRES_IN} from "CONSTANTS/GLOBALS";
import { Params } from "interfaces/query/query";
import { UserRegisterType } from "interfaces/user/user";
import {createTokenService} from "server/services/globalServices/createToken";
import { emailAlreadyExistsService } from "server/services/userAuth/emailAlreadyExists";
import { saveUserService } from "server/services/userAuth/saveUser";

export type SaveUserController = Params & {
  input: UserRegisterType;
};

export const registerUserController = async ({
  ctx,
  input,
}: SaveUserController) => {
  try {
    const emailExists = await emailAlreadyExistsService({ ctx, input });
    if (emailExists) {
      throw {
        message: "Ya existe un usuario con el mismo email",
      };
    }
    const savedUser = await saveUserService({ ctx, input });
    const jwt = createTokenService({
      id: savedUser.id,
      expiresIn: TOKEN_EXPIRES_IN,
      SECRET_KEY,
    });
    return {
      id: savedUser.id,
      name: savedUser.name,
      jwt,
    };
  } catch (e) {
    return {
      error: true,
      message: "Ocurrió un error al tratar de crear un nuevo usuario",
      data: e,
    };
  }
};
