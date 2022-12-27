import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { Params } from "interfaces/query/query";
import { getUserCartService } from "server/services/cart/getUserCart";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";

type GetUserCartController = Params & {
  input: {
    jwt: string;
  };
};

export const getUserCartController = async ({
  ctx,
  input,
}: GetUserCartController) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    const cart = await getUserCartService({
      ctx,
      input: {
        userId: tokenIsValid.id,
      },
    });
    return {
      error: false,
      cart,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
