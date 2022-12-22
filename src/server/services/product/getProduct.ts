import { Params } from "interfaces/query/query";
import { Product } from "Types";

type GetOneProductServiceParams = Params & {
  input: Omit<
    Product,
    | "id"
    | "name"
    | "price"
    | "inventary"
    | "description"
    | "createdAt"
    | "updatedAt"
  >;
};

export const getToProductPageService = async ({
  ctx,
  input,
}: GetOneProductServiceParams) => {
  try {
    const product = await ctx.prisma.product.findMany({
      where: {
        slug: input.slug,
      },
      select: {
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
