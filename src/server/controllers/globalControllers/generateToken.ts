import {SECRET_KEY, TOKEN_EXPIRES_IN} from "CONSTANTS/GLOBALS";
import {createTokenService} from "server/services/globalServices/createToken";

type GenerateToken = {
  input: {
    id: string;
  },
}

export const generateTokenController = ({input}: GenerateToken) => {
  try{
    const token = createTokenService({
      id: input.id,
      expiresIn: TOKEN_EXPIRES_IN,
      SECRET_KEY: SECRET_KEY,
    });
    return {
      jwt: token,
    }
  }catch(e){
    return{
      error: true,
      message: 'No se pudo generar un nuevo token',
      data: e,
    }
  }
}
