import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";
import {Form} from "components/Form/Form";

const Crear: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Crear</title>
        <meta name="description" content="Crea los productos que queras vender :D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-full">
      <h2 className="my-4 text-xl text-center font-bold">Añade un nuevo producto</h2>
      <Form />
      </section>
    </PageLayout>
  );
};

export default Crear;
