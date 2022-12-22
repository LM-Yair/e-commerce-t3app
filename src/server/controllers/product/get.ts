import { Params } from "interfaces/query/query";
import { getProductsToHomePageService } from "server/services/product/getProducts";

type GetProductControllerParams = Params;

export const getProductListToHomePageController = async ({
  ctx,
}: GetProductControllerParams) => {
  try {
    const products = await getProductsToHomePageService({ ctx });
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
