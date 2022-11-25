import { Token } from "Types";
import { createToken } from "utils/server/encryption";

type CreateTokenService = {
  id:string;
  expiresIn: string;
  SECRET_KEY: string;
}
export const createTokenService = ({id, expiresIn, SECRET_KEY}: CreateTokenService): Token => { 
  const jwt = createToken({
    id,
    secretKey: SECRET_KEY,
    expiresIn,
  });
  return jwt;
}
