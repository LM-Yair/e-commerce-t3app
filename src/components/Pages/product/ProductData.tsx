import { useContext, useEffect, useState } from "react";
import { trpc } from "utils/trpc";

import { User } from "interfaces/user/user";
import { Product } from "interfaces/product/product";
import { LinkText } from "components/Links/LinkText";
import { CartIcon } from "components/Icons/Cart";
import { Notice } from "components/Info/Notice";
import { AuthContext } from "context/auth/AuthContext";
import { AUTH_STATUS } from "CONSTANTS/AUTH";

type ProductToView = Omit<Product, "updatedAt"> & {
  user: Omit<User, "email" | "updatedAt" | "createdAt" | "password">;
};

type ProductDataProps = {
  slug: Product["slug"];
};

export const ProductData = ({ slug }: ProductDataProps) => {
  const { statusAuth } = useContext(AuthContext);
  const [product, setProduct] = useState<ProductToView | undefined>(undefined);
  const ctx = trpc.useContext();
  useEffect(() => {
    ctx.product.getToProductPage
      .fetch({ slug })
      .then((res) => {
        if (res.product) {
          setProduct(res.product);
        }
      })
      .catch(console.warn);
  }, []);
  if (!product) {
    return (
      <section className="my-4 flex flex-wrap justify-center gap-4 text-lg text-neutral-600">
        <Notice text="Parece que este producto no existe :(" />
      </section>
    );
  }
  return (
    <section className="my-4 flex flex-wrap justify-center gap-4 text-lg text-neutral-600">
      <div className="h-[32rem] w-full max-w-[28rem] bg-neutral-300"></div>
      <div className="w-full max-w-[32rem]">
        <h2 className="mb-2 text-2xl font-semibold">{product.name}</h2>
        {statusAuth.auth_status === AUTH_STATUS.AUTHENTICATED && (
          <section className="flex flex-wrap gap-2 py-2">
            <CartIcon size={25} productId={product.id} />
          </section>
        )}
        <h6 className="mt-2 text-lg font-semibold text-cyan-500">Precio:</h6>
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
  );
};
