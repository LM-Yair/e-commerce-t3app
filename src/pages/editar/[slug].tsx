import Head from "next/head";
import { type NextPage } from "next";
import { PageLayout } from "components/Pages/PageLayout";
import { AuthProvider } from "context/auth/AuthProvider";

const Editar: NextPage = () => {
  return (
    <AuthProvider>
      <PageLayout>
        <Head>
          <title>Editar</title>
          <meta name="description" content="Edita el producto seleccionado" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>Editar</main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Editar;
