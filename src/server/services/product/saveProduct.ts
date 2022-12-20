import { ProductCreate } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { slugify } from "utils/server/slugify";

type SaveProductServiceParams = Params & {
  input: ProductCreate & {
    userId: string;
  };
};

export const saveProductService = async ({
  ctx,
  input,
}: SaveProductServiceParams) => {
  try {
    const productSlug = slugify(input.name, "-");
    const productSaved = await ctx.prisma.product.create({
      data: {
        name: input.name,
        slug: productSlug,
        price: input.price,
        inventary: input.inventary,
        description: input.description,
        user: {
          connect: {
            id: input.userId,
          },
        },
      },
    });
    return productSaved;
  } catch (e) {
    throw e;
  }
};
