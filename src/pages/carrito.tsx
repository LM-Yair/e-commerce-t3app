import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";
import {ProductCart} from "components/Cards/ProductCart";

const Carrito: NextPage = () => {
  return (
    <PageLayout>
      <Head>
        <title>Carrito</title>
        <meta name="description" content="Encuentra los productos que has seleccionado para comprar" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
	<section className="p-2 mx-auto max-w-3xl flex flex-col gap-2">
	  <ProductCart />
	  <ProductCart />
	  <ProductCart />
	  <ProductCart />
	</section>
      </main>
    </PageLayout>
  );
};

export default Carrito;
