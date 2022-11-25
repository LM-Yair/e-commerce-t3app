import { Token } from "Types";
import { tokenIsValid } from "utils/server/encryption";

type VerifyTokenStateService = {
  token: Token;
  SECRET_KEY: string;
}

export const verifyTokenStateService = ({token, SECRET_KEY}: VerifyTokenStateService) => { 
  try{
    const jwt = tokenIsValid(token, SECRET_KEY);
    return {
      error: false,
      id: jwt.id,
      iat: jwt.iat,
      exp: jwt.exp,
    }
  }catch(e){
    return {
      error: true,
      status: e,
    }
  }
}
