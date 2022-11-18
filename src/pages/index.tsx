import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";
import {Product} from "components/Cards/Product";
// import { trpc } from "utils/trpc";

const Home: NextPage = () => {
  // const hello = trpc.example.hello.useQuery({ text: "from tRPC! :D" });
  return (
    <PageLayout>
      <Head>
        <title>Inicio</title>
        <meta name="description" content="Página principal" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
	<section className="p-2 mx-auto max-w-4xl flex flex-wrap justify-evenly gap-2">
	  <Product />
	  <Product />
	  <Product />
	  <Product />
	  <Product />
	  <Product />
	</section>
      </main>
    </PageLayout>
  );
};

export default Home;
