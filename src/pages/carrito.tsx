import Head from "next/head";
import type { NextPage } from "next";

import { PageLayout } from "components/Pages/PageLayout";
import { AuthProvider } from "context/auth/AuthProvider";
import { ProductList } from "components/Pages/carrito/ProductList";

const Carrito: NextPage = () => {
  return (
    <AuthProvider redirect={true} hideContentDurignValidating={true}>
      <PageLayout>
        <Head>
          <title>Carrito</title>
          <meta
            name="description"
            content="Encuentra los productos que has seleccionado para comprar"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <ProductList />
        </main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Carrito;
