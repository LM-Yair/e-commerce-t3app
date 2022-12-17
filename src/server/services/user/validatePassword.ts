import { Params } from "interfaces/query/query";
import { User } from "interfaces/user/user";
import { decrypt } from "utils/server/encryption";

type ValidatePassword = Params & {
  input: {
    password: User["password"];
    passwordHashed: string;
  };
};

export const validatePasswordService = ({ input }: ValidatePassword) => {
  try {
    const isValid = decrypt(input.password, input.passwordHashed);
    return isValid;
  } catch (e) {
    throw e;
  }
};
