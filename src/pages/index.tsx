import Head from "next/head";
import { type NextPage } from "next";

import { PageLayout } from "components/Pages/PageLayout";
import { AuthProvider } from "context/auth/AuthProvider";
import { LastProducts } from "components/Sections/LastProducts";

const Home: NextPage = () => {
  return (
    <AuthProvider>
      <PageLayout>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Página principal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <LastProducts />
        </main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Home;
