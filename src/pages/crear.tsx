import Head from "next/head";
import type { NextPage } from "next";

import { PageLayout } from "components/Pages/PageLayout";
import { AuthProvider } from "context/auth/AuthProvider";
import { CreateProductForm } from "components/Forms/CreateProductForm";

const Crear: NextPage = () => {
  return (
    <AuthProvider redirect={true} hideContentDurignValidating={true}>
      <PageLayout>
        <Head>
          <title>Crear</title>
          <meta
            name="description"
            content="Crea los productos que queras vender :D"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="h-full">
          <CreateProductForm />
        </section>
      </PageLayout>
    </AuthProvider>
  );
};

export default Crear;
