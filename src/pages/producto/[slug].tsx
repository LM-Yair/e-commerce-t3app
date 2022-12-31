import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { AuthProvider } from "context/auth/AuthProvider";
import { PageLayout } from "components/Pages/PageLayout";
import { ProductData } from "components/Pages/product/ProductData";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  return {
    props: {
      slug,
    },
  };
};

const Producto: NextPage<{ slug: string }> = ({ slug }) => {
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
        <ProductData slug={slug} />
      </PageLayout>
    </AuthProvider>
  );
};

export default Producto;
