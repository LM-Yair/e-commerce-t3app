import { LinkText } from "components/Links/LinkText";
import { AUTH_STATUS } from "CONSTANTS/AUTH";
import { AuthContext } from "context/auth/AuthContext";
import { useContext } from "react";

export const Header = () => {
  const { statusAuth } = useContext(AuthContext);
  return (
    <header className="sticky top-0 z-20 p-2 text-neutral-200">
      <div className="flex flex justify-between rounded-lg bg-neutral-800 p-4">
        <div>
          <h1 className="text-lg font-bold">E-Commerce</h1>
        </div>
        <nav className="flex h-full items-center justify-center gap-2 text-lg font-bold">
          {statusAuth.auth_status === AUTH_STATUS.AUTHENTICATED ? (
            <>
              <LinkText href="/" text="Inicio" />
              <LinkText href="/crear" text="Crear" />
              <LinkText href="/carrito" text="Carrito" />
            </>
          ) : (
            <>
              <LinkText href="/login" text="Login" />
              <LinkText href="/singin" text="Singin" />
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
