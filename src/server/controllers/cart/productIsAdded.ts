import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { productIsAddedService } from "server/services/cart/productIsAdded";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";

type ProductIsAdded = Params & {
  input: {
    jwt: string;
    productId: Product["id"];
  };
};

export const productIsAddedController = async ({
  ctx,
  input,
}: ProductIsAdded) => {
  try {
    const tokenIsValid = verifyTokenStateService({
      token: input.jwt,
      SECRET_KEY,
    });
    if (tokenIsValid.error) {
      throw {
        jwt: tokenIsValid,
      };
    }
    const isAdded = await productIsAddedService({
      ctx,
      input: {
        userId: tokenIsValid.id,
        productId: input.productId,
      },
    });
    return {
      error: false,
      isAdded,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
