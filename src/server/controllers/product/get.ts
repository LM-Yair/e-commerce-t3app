import { Params } from "interfaces/query/query";
import { getProductService } from "server/services/product/getProduct";

type GetProductControllerParams = Params;

export const getProductController = async ({
  ctx,
}: GetProductControllerParams) => {
  try {
    const products = await getProductService({ ctx });
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
