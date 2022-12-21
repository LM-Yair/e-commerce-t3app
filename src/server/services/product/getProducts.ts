import { Params } from "interfaces/query/query";

type GetProductServiceParams = Params & {};

export const getProductsService = async ({ ctx }: GetProductServiceParams) => {
  try {
    const products = await ctx.prisma.product.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      select: {
        name: true,
        price: true,
        slug: true,
      },
    });
    return products;
  } catch (e) {
    throw e;
  }
};
