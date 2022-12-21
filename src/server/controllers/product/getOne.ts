import { Product } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { getOneProductService } from "server/services/product/getOneProduct";

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

export const getOneProdutcController = async ({
  ctx,
  input,
}: GetOneProductControllerParams) => {
  try {
    const product = await getOneProductService({ ctx, input });
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