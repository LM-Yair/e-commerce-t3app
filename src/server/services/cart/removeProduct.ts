// Elimina un producto del carritò

import { Params } from "interfaces/query/query";

type RemoveProuctFromCart = Params & {
  input: {
    userId: string;
    productId: string;
  };
};

export const removeProuctFromCartService = async ({
  ctx,
  input,
}: RemoveProuctFromCart) => {
  try {
    const cart = await ctx.prisma.cart.update({
      where: {
        userId: input.userId,
      },
      data: {
        products: {
          disconnect: {
            id: input.productId,
          },
        },
      },
    });
    return cart;
  } catch (e) {
    throw e;
  }
};
