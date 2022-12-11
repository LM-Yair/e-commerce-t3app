import { AUTH_STATUS } from "CONSTANTS/AUTH";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { jwt_get } from "utils/client/jsonwebtoken";
import { trpc } from "utils/trpc";
import { AuthContext } from "./AuthContext";

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
}

const redirectTo = "/login";

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const ctx = trpc.useContext();
  const [statusAuth, setStatusAuth] = useState(AUTH_STATUS.INITIAL);
  useEffect(() => {
    const jwt = jwt_get("jwt");
    if (!jwt) {
      router.replace(redirectTo);
      return;
    }
    ctx.userAuth.verifyAuth
      .fetch({ jwt })
      .then((data) => {
        if (data.error || !data.tokenIsValid) {
          setStatusAuth(AUTH_STATUS.FAILED);
          return;
        }
        if (data.tokenIsValid) {
          setStatusAuth(AUTH_STATUS.AUTHENTICATED);
        }
      })
      .catch(console.warn);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        statusAuth,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
