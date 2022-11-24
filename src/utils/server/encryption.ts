import { compare, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Token } from "Types";

type CreateToken = {
  userId: string, 
  secretKey: string, 
  expiresIn: string,
}

export const encrypt = async (password: string,saltOrRounds: string | number) => {
  try{
    const passwordEncrypted = await hash(password,saltOrRounds);
    return passwordEncrypted;
  }catch(e){
    throw e
  }
}

export const decrypt = async (password: string, passwordHashed: string) => {
  try{
    const passwordDecrypted = await compare(password, passwordHashed);
    return passwordDecrypted;
  }catch(e){
    throw e
  }
}

export const createToken = ({ userId, secretKey, expiresIn }: CreateToken) => {
  const jwt = sign({userId}, secretKey,{
    expiresIn,
  });
  return jwt;
}

export const tokenIsValid = (token: Token, secretOrPublicKey: string) => {
  const jwt = verify(token.jwt, secretOrPublicKey);
  return jwt;
}
