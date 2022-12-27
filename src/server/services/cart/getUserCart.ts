import { Params } from "interfaces/query/query";

type GetCart = Params & {
  input: {
    userId: string;
  };
};

export const getUserCartService = async ({ ctx, input }: GetCart) => {
  try {
    const cart = await ctx.prisma.cart.findUniqueOrThrow({
      where: {
        userId: input.userId,
      },
      select: {
        products: {
          select: {
            id: true,
            name: true,
            price: true,
            slug: true,
          },
        },
      },
    });
    return cart;
  } catch (e) {
    throw e;
  }
};
