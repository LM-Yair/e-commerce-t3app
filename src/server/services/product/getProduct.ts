import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";

type GetToProductPageService = Params & {
  input: {
    slug: Product["slug"];
  },
};


export const getToProductPageService = async ({
  ctx,
  input,
}: GetToProductPageService) => {
  try {
    const product = await ctx.prisma.product.findMany({
      where: {
        slug: input.slug,
      },
      select: {
        id: true,
        name: true,
        price: true,
        inventary: true,
        description: true,
        slug: true,
        createdAt: true,
        user: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
    return product[0];
  } catch (e) {
    throw e;
  }
};
