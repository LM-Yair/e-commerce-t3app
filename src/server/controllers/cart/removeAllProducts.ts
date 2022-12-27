import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { Params } from "interfaces/query/query";
import { RemoveAllProuctsFromCartService } from "server/services/cart/removeAllProducts";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";

type RemoveAllProuctsFromCart = Params & {
  input: {
    jwt: string;
  };
};

export const RemoveAllProuctsFromCartController = async ({
  ctx,
  input,
}: RemoveAllProuctsFromCart) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    const cart = await RemoveAllProuctsFromCartService({
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
