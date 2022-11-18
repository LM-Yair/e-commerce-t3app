import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";

const Producto: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Producto</title>
        <meta name="description" content="Observa más detalles del producto seleccionado" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
	Producto
      </main>
    </PageLayout>
  );
};

export default Producto;
