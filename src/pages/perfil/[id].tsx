import { useEffect, useState } from "react";
import Head from "next/head";
import { trpc } from "utils/trpc";
import type { GetServerSideProps, NextPage } from "next";

import { User } from "interfaces/user/user";
import { AuthProvider } from "context/auth/AuthProvider";
import { PageLayout } from "components/Pages/PageLayout";
import { Notice } from "components/Info/Notice";

type UserProfile = Omit<User, "id" | "email" | "updatedAt" | "password">;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { id } = context.query;
  return {
    props: {
      id,
    },
  };
};

const Perfil: NextPage<{ id: string }> = ({ id }) => {
  const [userProfile, setUserProfile] = useState<UserProfile | undefined>(
    undefined
  );
  const ctx = trpc.useContext();
  useEffect(() => {
    ctx.user.profile
      .fetch({ id })
      .then((res) => {
        if (res.error) throw res;
        if (res.user) {
          const { name, createdAt } = res.user;
          setUserProfile({ name, createdAt });
        }
      })
      .catch(console.warn);
  }, []);
  return (
    <AuthProvider>
      <PageLayout>
        <Head>
          <title>Producto</title>
          <meta
            name="description"
            content="Observa el perfil de nuestro usuario"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main className="p-2">
          {!userProfile && (
            <div className="flex h-96 items-center justify-center">
              <Notice text="Obteniendo usuario..." />
            </div>
          )}
          {userProfile && (
            <section className="relative h-64 rounded-lg bg-neutral-400 text-neutral-800">
              <div className="absolute -bottom-20 flex items-end">
                <div className="ml-10 h-40 w-40 rounded-full bg-neutral-800"></div>
                <div className="p-4">
                  <h3 className="text-2xl font-semibold">
                    {userProfile?.name}
                  </h3>
                  <span className="text-lg">
                    Se unió:{" "}
                    {`${new Date(userProfile.createdAt).toLocaleDateString()}`}
                  </span>
                </div>
              </div>
            </section>
          )}
        </main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Perfil;
