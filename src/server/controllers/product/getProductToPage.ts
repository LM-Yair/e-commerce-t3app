import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { getToProductPageService } from "server/services/product/getProduct";

type GetOneProductControllerParams = Params & {
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
