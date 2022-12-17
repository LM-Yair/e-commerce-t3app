import { useRouter } from "next/router";
import { trpc } from "utils/trpc";
import { z } from "zod";

import { InputPassword } from "components/Form/InputPassword";
import { InputText } from "components/Form/InputText";
import { Submit } from "components/Form/Submit";
import { LinkText } from "components/Links/LinkText";
import { FormProvider } from "context/form/FormProvider";
import { jwt_save } from "utils/client/jsonwebtoken";

const loginInit = {
  email: "",
  password: "",
};

const validation = {
  email: z.string().email(),
  password: z.string().min(8),
};

const Login = () => {
  const router = useRouter();
  const ctx = trpc.useContext();
  return (
    <main className="background_desing h-screen w-screen">
      <section className="flex h-full items-center justify-center">
        <FormProvider
          formInit={{
            initialState: loginInit,
            stateToReset: loginInit,
            validationShape: validation,
            submitPrevented: async (resetForm, values) => {
              try {
                const userLoged = await ctx.userAuth.loginUser.fetch({
                  email: typeof values.email === "string" ? values.email : "",
                  password:
                    typeof values.password === "string" ? values.password : "",
                });
                if (userLoged.error) throw userLoged;
                jwt_save("jwt", userLoged.jwt || "");
                resetForm();
                router.replace("/");
                return;
              } catch (e) {
                console.warn(e);
              }
            },
          }}
          className="m-2 w-full max-w-[28rem] p-4"
        >
          <h2 className="mb-4 border-l-4 border-cyan-500 pl-10 text-xl font-bold text-neutral-500">
            LOGIN
          </h2>
          <InputText
            className="mb-2 w-full bg-neutral-100 p-4 text-neutral-500 outline-none"
            name="email"
            alert="Coloca un email válido"
            placeholder="Email:"
          />
          <InputPassword
            className="mb-2 w-full bg-neutral-100 p-4 text-neutral-500 outline-none"
            name="password"
            alert="La contraseña debe contener al menos 8 carácteres"
            placeholder="Contraseña:"
          />
          <Submit
            className="mb-2 w-full bg-cyan-500 p-4 text-xl font-semibold text-neutral-200 hover:opacity-80 active:bg-cyan-600"
            text="Iniciar sesión"
          />
          <p className="text-neutral-500">
            ¿No tienes una cuenta? <LinkText text="Crea una" href="/singin" />.
          </p>
        </FormProvider>
      </section>
    </main>
  );
};

export default Login;
