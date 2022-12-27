// Elimina todos los productos del carritò

import { Params } from "interfaces/query/query";

type RemoveAllProuctsFromCart = Params & {
  input: {
    userId: string;
  };
};

export const RemoveAllProuctsFromCartService = async ({
  ctx,
  input,
}: RemoveAllProuctsFromCart) => {
  try {
    const cart = await ctx.prisma.cart.update({
      where: {
        userId: input.userId,
      },
      data: {
        products: {
          deleteMany: {},
        },
      },
    });
    return cart;
  } catch (e) {
    throw e;
  }
};
