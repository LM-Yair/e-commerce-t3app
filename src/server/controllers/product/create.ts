import { ProductCreate } from "interfaces/product/product";
import { Params } from "interfaces/query/query";
import { verifyTokenStateService } from "server/services/globalServices/verifyTokenState";
import { userIdAlreadyExistsService } from "server/services/userAuth/userIdAlreadyExists";
import { SECRET_KEY } from "CONSTANTS/GLOBALS";
import { saveProductService } from "server/services/product/saveProduct";

type CreateProductControllerParams = Params & {
  input: ProductCreate & {
    jwt: string;
  };
};

export const createProductControlller = async ({
  ctx,
  input,
}: CreateProductControllerParams) => {
  try {
    // verificar si el token es válido
    const tokenIsValid = verifyTokenStateService({
      SECRET_KEY: SECRET_KEY,
      token: input.jwt,
    });
    if (tokenIsValid.error) {
      throw {
        message: "El token no es válido",
      };
    }
    // verificar si el usuario existe con el id que retorna el jwt
    // al decodificarlo
    const userExists = await userIdAlreadyExistsService({
      ctx,
      id: `${tokenIsValid.id}`,
    });
    if (!userExists) {
      throw {
        message: "No existe un usuario con este id",
      };
    }
    const productSaved = await saveProductService({
      ctx,
      input: {
        userId: tokenIsValid.id,
        name: input.name,
        price: input.price,
        inventary: input.inventary,
        description: input.description,
      },
    });
    return {
      error: false,
      productSaved,
    }; 
  } catch (e) {
    return {
      error: true,
      data: e,
    };
  }
};
