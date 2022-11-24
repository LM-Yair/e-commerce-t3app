import { createUserTokenService, emailAlreadyExistsService, saveUserService, verifyTokenStateService } from "server/services/userAuth";
import { QueryParams, Token } from "Types";

export type SaveUserController = QueryParams & {
  input:{
    name: string;
    email: string;
    password: string;
  };
}

const tokenExpiresIn = "1 d";

export const saveUserController = async ({ctx, input}: SaveUserController) => {
  try{
    const emailExists = await emailAlreadyExistsService({ctx, input});
    if(emailExists){
      throw {
        message: 'Ya existe un usuario con el mismo email',
      }
    }
    const savedUser = await saveUserService({ctx,input});
    const userAndToken = createUserTokenService(savedUser, tokenExpiresIn);
    return userAndToken;
  }catch(e){
    return {
      error: true,
      message: 'Ocurrió un error al tratar de autenticar al usuario',
      data: e,
    }
  }
}

type VerifyAuthStateController = QueryParams & { input: Token; }

export const verifyAuthStateController = async ({ctx, input}: VerifyAuthStateController) => {
  try{
    const userExists = await emailAlreadyExistsService({ctx, input});
    if(!userExists){
      throw {
        message: `Parece que el usuario con el email: ${input.email} no existe`,
      }
    }
    const tokenIsValid = verifyTokenStateService(input);
    return tokenIsValid;
  }catch(e){
    return {
      error: true,
      message: 'Ocurrió un error al tratar de verificar el token',
      data: e,
    }
  }
}
