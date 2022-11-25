import {QueryParams} from "Types";
import {emailAlreadyExistsService} from "server/services/userAuth/emailAlreadyExists";
import {saveUserService} from "server/services/userAuth/saveUser";

export type SaveUserController = QueryParams & {
  input:{
    name: string;
    email: string;
    password: string;
  };
}

export const saveUserController = async ({ctx, input}: SaveUserController) => {
  try{
    const emailExists = await emailAlreadyExistsService({ctx, input});
    if(emailExists){
      throw {
        message: 'Ya existe un usuario con el mismo email',
      }
    }
    const savedUser = await saveUserService({ctx,input});
    return {
      id: savedUser.id,
      name: savedUser.name,
    };
  }catch(e){
    return {
      error: true,
      message: 'Ocurrió un error al tratar de crear un nuevo usuario',
      data: e,
    }
  }
}
