import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";

const Editar: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Editar</title>
        <meta name="description" content="Edita el producto seleccionado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
	Editar
      </main>
    </PageLayout>
  );
};

export default Editar;
