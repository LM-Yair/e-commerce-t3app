import Head from "next/head";
import { type NextPage } from "next";
import { trpc } from "utils/trpc";

import { PageLayout } from "components/Pages/PageLayout";
import { Product } from "components/Cards/Product";
import { AuthProvider } from "context/auth/AuthProvider";

const Home: NextPage = () => {
  // const user = trpc.userAuth.saveUser.useQuery({
  //   name: 'Yair Lázaro',
  //   email: 'yairlazaro@outlook.com',
  //   password: '12345',
  // });
  // console.log( 'Ususario guardado: ', user);
  // const id = "d9cfe65f-1c1e-4ab7-a531-a0606e91b779";
  // const token = trpc.userAuth.generateToken.useQuery({id});
  // console.log('Token creado: ', token);
  // const token = {
  //   jwt: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ5Y2ZlNjVmLTFjMWUtNGFiNy1hNTMxLWEwNjA2ZTkxYjc3OSIsImlhdCI6MTY2OTMzODAxMSwiZXhwIjoxNjY5NDI0NDExfQ.8uCmld0G0LxbnQ0yG_e94uaS_MdFdoBdeRV47fV_zeo"
  // }
  // const tokenState = trpc.userAuth.verifyAuth.useQuery(token);
  // console.log('Token status: ', tokenState);

  return (
    <AuthProvider>
      <PageLayout>
        <Head>
          <title>Inicio</title>
          <meta name="description" content="Página principal" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
          <section className="mx-auto flex max-w-4xl flex-wrap justify-evenly gap-2 p-2">
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
            <Product />
          </section>
        </main>
      </PageLayout>
    </AuthProvider>
  );
};

export default Home;
