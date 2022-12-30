import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";

type ProductIsAdded = Params & {
  input: {
    userId: string;
    productId: Product["id"];
  };
};

export const productIsAddedService = async ({
  ctx,
  input,
}: ProductIsAdded): Promise<Boolean> => {
  try {
    const isAdded = await ctx.prisma.cart.findUniqueOrThrow({
      where: {
        userId: input.userId,
      },
      select: {
        products: {
          where: {
            id: input.productId,
          },
          select: {
            slug: true,
          },
        },
      },
    });
    return isAdded.products.length !== 0;
  } catch (e) {
    throw e;
  }
};
