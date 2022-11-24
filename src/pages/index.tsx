import Head from "next/head";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";

import {PageLayout} from "components/Pages/PageLayout";
import {Product} from "components/Cards/Product";

const Home: NextPage = () => {
  const user = trpc.userAuth.saveUser.useQuery({ 
    name: 'Yair Lázaro',
    email: 'yairlazaro@outlook.com',
    password: '12345',
  });
  console.log( 'Usuario: ', user);
  // const tokenState = trpc.userAuth.verifyAuth.useQuery({
  //   id: user.data?.id || '',
  //   name: user.data?.name || '',
  //   email: user.data?.email || '',
  //   password: user.data?.password || '',
  //   createdAt: user.data?.createdAt || new Date(),
  //   updatedAt: user.data?.updatedAt || new Date(),
  //   jwt: user.data?.jwt || '',
  // });
  // console.log('Token status: ', tokenState);

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
