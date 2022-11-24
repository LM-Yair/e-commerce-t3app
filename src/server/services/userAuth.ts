import { SaveUserController } from "server/controllers/userAuth";
import { Token, User } from "Types";
import { encrypt, createToken, tokenIsValid } from "utils/server/encryption";

const SECRET_KEY = process.env.SECRET_KEY || '12afg3agf4f5dfd';

export const emailAlreadyExistsService = async ({
  ctx, 
  input
}: SaveUserController): Promise<boolean> => {
  const existEmail = await ctx.prisma.user.findUnique({
    where: { email: input.email },
  });
  return existEmail ? true : false;
}

export const saveUserService = async ({ ctx, input }: SaveUserController) => {
  try{
    const passwordHashed = await encrypt(input.password, 10);
    const savedUser = await ctx.prisma.user.create({
      data: {
        name: input.name,
        email: input.email,
        password: passwordHashed,
      },
    });
  return savedUser;
  }catch(e){
    throw e;
  }
}

export const createUserTokenService = (user: User, expiresIn: string): Token => { 
  const jwt = createToken({
    userId: user.id,
    secretKey: SECRET_KEY,
    expiresIn,
  });
  return {...user, jwt}
}

export const verifyTokenStateService = (token: Token) => { 
  const jwt = tokenIsValid(token,SECRET_KEY);
  return jwt
}
