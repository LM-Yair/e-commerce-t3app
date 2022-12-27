import { Params } from "interfaces/query/query";

type AddProductToCart = Params & {
  input: {
    userId: string;
    productId: string;
  };
};

export const addProuctToCartService = async ({
  ctx,
  input,
}: AddProductToCart) => {
  try {
    const cart = await ctx.prisma.cart.update({
      where: {
        userId: input.userId,
      },
      data: {
        products: {
          connect: {
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
