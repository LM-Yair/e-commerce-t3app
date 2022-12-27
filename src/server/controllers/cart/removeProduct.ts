import { Params } from "interfaces/query/query";
import { removeProuctFromCartService } from "server/services/cart/removeProduct";

type RemoveProuctFromCart = Params & {
  input: {
    userId: string;
    productId: string;
  };
};

export const removeProductFromCartController = async ({
  ctx,
  input,
}: RemoveProuctFromCart) => {
  try {
    const cart = await removeProuctFromCartService({ ctx, input });
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
