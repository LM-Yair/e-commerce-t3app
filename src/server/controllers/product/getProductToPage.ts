import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { getToProductPageService } from "server/services/product/getProduct";

type GetOneProductControllerParams = Params & {
  input: {
    slug: Product["slug"];
  },
};

export const getToProductPageController = async ({
  ctx,
  input,
}: GetOneProductControllerParams) => {
  try {
    const product = await getToProductPageService({ ctx, input });
    return {
      error: false,
      product,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
