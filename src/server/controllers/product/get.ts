import { Params } from "interfaces/query/query";
import { getProductsService } from "server/services/product/getProducts";

type GetProductControllerParams = Params;

export const getProductController = async ({
  ctx,
}: GetProductControllerParams) => {
  try {
    const products = await getProductsService({ ctx });
    return {
      error: false,
      products,
    };
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
