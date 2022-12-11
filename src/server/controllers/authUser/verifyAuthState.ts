import { Params } from "interfaces/query/query";
import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";
import { userIdAlreadyExistsService } from "server/services/userAuth/userIdAlreadyExists";

type VerifyAuthStateController = Params & {
  input: {
    jwt: string;
  };
};

export const verifyAuthStateController = async ({
  ctx,
  input,
}: VerifyAuthStateController) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    if (!tokenIsValid.error && tokenIsValid.id) {
      const userExists = await userIdAlreadyExistsService({
        ctx,
        id: tokenIsValid.id,
      });
      if (!userExists) {
        throw {
          message: `El token pertenece a un usuario que no existe`,
        };
      }
    }
    return {
      error: false,
      tokenIsValid: true,
    };
  } catch (e) {
    return {
      error: true,
      message: "Ocurrió un error al tratar de verificar el token",
      data: e,
    };
  }
};
