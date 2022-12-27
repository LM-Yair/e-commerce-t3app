import { Params } from "interfaces/query/query";
import { addProuctToCartService } from "server/services/cart/addProduct";

type AddUserCartController = Params & {
  input: {
    userId: string;
    productId: string;
  };
};

export const addProductToCartController = async ({
  ctx,
  input,
}: AddUserCartController) => {
  try {
    const cart = await addProuctToCartService({ ctx, input });
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
