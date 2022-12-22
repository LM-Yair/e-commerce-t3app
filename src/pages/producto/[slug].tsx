import { useEffect, useState } from "react";
import { trpc } from "utils/trpc";
import type { GetServerSideProps, NextPage } from "next";
import Head from "next/head";

import { User } from "interfaces/user/user";
import { Product } from "interfaces/product/product";
import { LinkText } from "components/Links/LinkText";
import { AuthProvider } from "context/auth/AuthProvider";
import { PageLayout } from "components/Pages/PageLayout";

type ProductToView = Omit<Product, "updatedAt" | "id"> & {
  user: Omit<User, "email" | "updatedAt" | "createdAt" | "password">;
};
export const getServerSideProps: GetServerSideProps = async (context) => {
  const { slug } = context.query;
  return {
    props: {
      slug,
    },
  };
};

const Producto: NextPage<{ slug: string }> = ({ slug }) => {
  const [product, setProduct] = useState<ProductToView | undefined>(undefined);
  const ctx = trpc.useContext();
  useEffect(() => {
    ctx.product.getToProductPage
      .fetch({ slug })
      .then((res) => {
        if (res.product) {
          const { name, price, inventary, description, slug, createdAt, user } =
            res.product;
          setProduct({
            name,
            price,
            inventary,
            description,
            slug,
            createdAt,
            user: {
              id: user.id,
              name: user.name,
            },
          });
        }
      })
      .catch(console.warn);
  }, []);
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
        {product ? (
          <section className="my-4 flex flex-wrap justify-center gap-4 text-lg text-neutral-600">
            <div className="h-[32rem] w-full max-w-[28rem] bg-neutral-300"></div>
            <div className="w-full max-w-[32rem]">
              <h2 className="mb-2 text-2xl font-semibold">{product.name}</h2>
              <h6 className="mt-2 text-lg font-semibold text-cyan-500">
                Precio:
              </h6>
              <span className="text-3xl">MXN {product.price}</span>
              <h6 className="mt-2 text-lg font-semibold text-cyan-500">
                Lo que tienes que saber de este producto:
              </h6>
              <p className="whitespace-pre-line pl-2">{product.description}</p>
              <h6 className="mt-2 text-lg font-semibold text-cyan-500">
                Inventario:
              </h6>
              <div>Quedan: {product.inventary}</div>
              <div>
                publicado: {`${new Date(product.createdAt).toLocaleString()}`}
              </div>
              <LinkText
                type="NextLink"
                text={`Propietario: ${product.user.name}`}
                href={`/perfil/${product.user.id}`}
              />
            </div>
          </section>
        ) : (
          <></>
        )}
      </PageLayout>
    </AuthProvider>
  );
};

export default Producto;
