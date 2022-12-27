import { Params } from "interfaces/query/query";
import { RemoveAllProuctsFromCartService } from "server/services/cart/removeAllProducts";

type RemoveAllProuctsFromCart = Params & {
  input: {
    userId: string;
  };
};

export const RemoveAllProuctsFromCartController = async ({
  ctx,
  input,
}: RemoveAllProuctsFromCart) => {
  try {
    const cart = await RemoveAllProuctsFromCartService({ ctx, input });
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
