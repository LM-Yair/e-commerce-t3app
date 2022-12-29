import { trpc } from "utils/trpc";
import { useContext, useEffect, useState } from "react";

import { Product } from "interfaces/product/product";
import { ProductCart } from "components/Cards/ProductCart";
import { AuthContext } from "context/auth/AuthContext";

type Cart =
  | undefined
  | Omit<Product, "createdAt" | "updatedAt" | "description">[];

export const ProductList = () => {
  const { statusAuth } = useContext(AuthContext);
  const ctx = trpc.useContext();
  const [cart, setCart] = useState<Cart>(undefined);

  const removeProduct = async (productId: string) => {
    try {
      if (!cart) return;
      await ctx.cart.removeProduct.fetch({
        jwt: statusAuth.jwt,
        productId,
      });
      const newCart = cart.filter((product) => product.id !== productId);
      setCart(newCart);
    } catch (e) {
      console.warn(e);
    }
  };

  useEffect(() => {
    ctx.cart.getUserCart
      .fetch({ jwt: statusAuth.jwt })
      .then((res) => {
        setCart(res.cart?.products);
      })
      .catch(console.warn);
  }, []);
  return (
    <section className="mx-auto flex max-w-3xl flex-col gap-2 p-2">
      {(!cart || !cart.length) && (
        <div className="flex h-56 items-center justify-center">
          <p className="max-w-[60ch] text-center text-lg font-semibold text-neutral-600">
            Parece que aún no tienes productos en tu carrito ve a la página
            principal y añade los productos que más te gusten.
          </p>
        </div>
      )}
      {cart &&
        cart.map((product) => (
          <ProductCart
            key={product.id}
            id={product.id}
            slug={product.slug}
            name={product.name}
            price={product.price}
            inventary={product.inventary}
            remove={removeProduct}
          />
        ))}
    </section>
  );
};
