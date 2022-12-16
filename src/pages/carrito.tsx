import Head from "next/head";
import { type NextPage } from "next";
import { PageLayout } from "components/Pages/PageLayout";
import { ProductCart } from "components/Cards/ProductCart";
import { AuthProvider } from "context/auth/AuthProvider";

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
          <section className="mx-auto flex max-w-3xl flex-col gap-2 p-2">
            <ProductCart />
            <ProductCart />
            <ProductCart />
            <ProductCart />
          </section>
        </main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Carrito;
