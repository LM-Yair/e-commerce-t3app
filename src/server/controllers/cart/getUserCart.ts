import { Params } from "interfaces/query/query";
import { getUserCartService } from "server/services/cart/getUserCart";

type GetUserCartController = Params & {
  input: {
    userId: string;
  };
};

export const getUserCartController = async ({
  ctx,
  input,
}: GetUserCartController) => {
  try {
    const cart = await getUserCartService({ ctx, input });
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
