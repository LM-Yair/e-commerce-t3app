import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { Params } from "interfaces/query/query";
import { removeProuctFromCartService } from "server/services/cart/removeProduct";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";

type RemoveProuctFromCart = Params & {
  input: {
    jwt: string;
    productId: string;
  };
};

export const removeProductFromCartController = async ({
  ctx,
  input,
}: RemoveProuctFromCart) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    const cart = await removeProuctFromCartService({
      ctx,
      input: {
        userId: tokenIsValid.id,
        productId: input.productId,
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
