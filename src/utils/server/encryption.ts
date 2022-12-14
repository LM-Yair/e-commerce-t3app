import { compareSync, hash } from "bcrypt";
import { sign, verify } from "jsonwebtoken";
import { Token } from "Types";

type CreateToken = {
  id: string, 
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

export const decrypt = (password: string, passwordHashed: string): boolean => {
  const passwordDecrypted = compareSync(password, passwordHashed);
  return passwordDecrypted;
};

export const createToken = ({ id, secretKey, expiresIn }: CreateToken) => {
  const jwt = sign({id}, secretKey,{
    expiresIn,
  });
  return jwt;
}

export const tokenIsValid = (token: Token, secretOrPublicKey: string) => {
  try{
    const jwt = verify(token, secretOrPublicKey);
    return {
      id: (<any>jwt).id,
      exp: (<any>jwt).exp,
      iat: (<any>jwt).iat,
    };
  }catch(e){
    throw e
  }
}
