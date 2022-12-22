import { trpc } from "utils/trpc";

import { Productcard } from "components/Cards/Product";
import { useEffect, useState } from "react";
import { Product } from "interfaces/product/product";
import { random } from "utils/globals/random";
import { PRODUCTS } from "CONSTANTS/PRODUCTS";
import { Notice } from "components/Info/Notice";

type ProductCart = Omit<
  Product,
  "id" | "description" | "createdAt" | "updatedAt" | "inventary"
>;

export const LastProducts = () => {
  const [productsState, setProductsState] = useState(PRODUCTS.INITIAL_STATE);
  const [products, setProducts] = useState<undefined | ProductCart[]>(
    undefined
  );
  const ctx = trpc.useContext();
  useEffect(() => {
    setProductsState(PRODUCTS.LOADING);
    ctx.product.productListToHomePage
      .fetch()
      .then((res) => {
        setProducts(res.products);
        setProductsState(PRODUCTS.DONE);
      })
      .catch((error) => {
        console.warn(error);
        setProductsState(PRODUCTS.ERROR);
      });
  }, []);
  return (
    <section className="mx-auto flex max-w-4xl flex-wrap items-start justify-evenly gap-2 p-2">
      {productsState === PRODUCTS.ERROR && (
        <div className="flex h-64 w-full items-center justify-center">
          <Notice text="Parece que ocurrió un error al intentar obtener los productos, intentalo más tarde." />
        </div>
      )}
      {productsState === PRODUCTS.LOADING && (
        <div className="flex h-64 w-full items-center justify-center">
          <Notice text="Obteniendo Productos..." />
        </div>
      )}
      {productsState === PRODUCTS.DONE && products && products.length < 1 && (
        <div className="flex h-64 w-full items-center justify-center">
          <Notice text="Parece que aún no hay productos creados." />
        </div>
      )}
      {productsState === PRODUCTS.DONE &&
        products &&
        products.length > 0 &&
        products.map((product) => (
          <Productcard
            key={random(1, 1000)}
            name={product.name}
            price={product.price}
            slug={product.slug}
          />
        ))}
    </section>
  );
};
