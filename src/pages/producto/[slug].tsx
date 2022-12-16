import Head from "next/head";
import { type NextPage } from "next";
import { PageLayout } from "components/Pages/PageLayout";
import { AuthProvider } from "context/auth/AuthProvider";

const Producto: NextPage = () => {
  return (
    <AuthProvider>
      <PageLayout>
        <Head>
          <title>Producto</title>
          <meta
            name="description"
            content="Observa más detalles del producto seleccionado"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>Producto</main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Producto;
