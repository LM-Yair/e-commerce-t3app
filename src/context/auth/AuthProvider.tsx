import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import { AUTH_STATUS, JWT_STATUS } from "CONSTANTS/AUTH";
import { jwt_get } from "utils/client/jsonwebtoken";
import { trpc } from "utils/trpc";
import { AuthContext } from "./AuthContext";

export interface AuthProviderProps {
  children: JSX.Element | JSX.Element[];
  redirect?: boolean;
  hideContentDurignValidating?: boolean;
}

const auth_initial = {
  auth_status: AUTH_STATUS.INITIAL,
  jwt_status: JWT_STATUS.INITIAL,
};
const redirectTo = "/login";

export const AuthProvider = ({
  children,
  redirect = false,
  hideContentDurignValidating = false,
}: AuthProviderProps) => {
  const router = useRouter();
  const ctx = trpc.useContext();
  const [statusAuth, setStatusAuth] = useState(auth_initial);

  const redirectToLoginPage = () => router.replace(redirectTo);
  // si se habilita la redirección
  // se se ejecutará autoRedirect donde se llamé
  const autoRedirect = () => {
    if (redirect) redirectToLoginPage();
  };

  useEffect(() => {
    const jwt = jwt_get("jwt");
    if (!jwt) {
      autoRedirect();
      setStatusAuth({
        ...statusAuth,
        jwt_status: JWT_STATUS.JWT_DOES_NOT_EXIST,
      });
      return;
    }
    ctx.userAuth.verifyAuth
      .fetch({ jwt })
      .then((data) => {
        if (data.error || !data.tokenIsValid) {
          autoRedirect();
          setStatusAuth({
            auth_status: AUTH_STATUS.AUTHENTICATED,
            jwt_status: JWT_STATUS.JWT_HAS_EXPIRED,
          });
          return;
        }
        if (data.tokenIsValid) {
          setStatusAuth({
            auth_status: AUTH_STATUS.AUTHENTICATED,
            jwt_status: JWT_STATUS.JWT_HAS_NOT_EXPIRED,
          });
        }
      })
      .catch(console.warn);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        statusAuth,
        redirectToLoginPage,
      }}
    >
      {/* si la redirección esta activa, mostrará elcontenido hasta que 
      el suario esté autenticado */}
      {hideContentDurignValidating &&
        statusAuth.auth_status === AUTH_STATUS.AUTHENTICATED &&
        children}
      {/* si la redirección esta desactivada, mostrará el contenido de todas formas */}
      {!hideContentDurignValidating && children}
    </AuthContext.Provider>
  );
};
