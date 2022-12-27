import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { Params } from "interfaces/query/query";
import { addProuctToCartService } from "server/services/cart/addProduct";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";

type AddUserCartController = Params & {
  input: {
    jwt: string;
    productId: string;
  };
};

export const addProductToCartController = async ({
  ctx,
  input,
}: AddUserCartController) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    const cart = await addProuctToCartService({
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
