import { useContext, useEffect, useState } from "react";
import { trpc } from "utils/trpc";

import { AuthContext } from "context/auth/AuthContext";
import { IconProps } from "interfaces/icons/icons";
import { Product } from "interfaces/product/product";
import { Notice } from "components/Info/Notice";

type CartIconProps = IconProps & {
  productId: Product["id"];
};

const IS_IN_CART_STATUS = {
  INITIAL: 0,
  ERROR: -1,
  IS_IN_CART: 2,
  IS_NOT_IN_CART: -2,
};

export const CartIcon = ({ size, productId }: CartIconProps) => {
  const { statusAuth } = useContext(AuthContext);
  const ctx = trpc.useContext();
  const [isAddedInCart, setIsAddedInCart] = useState(IS_IN_CART_STATUS.INITIAL);

  const removeProduct = async () => {
    try {
      const res = await ctx.cart.removeProduct.fetch({
        jwt: statusAuth.jwt,
        productId,
      });
      if (res.error) {
        throw res;
      }
      setIsAddedInCart(IS_IN_CART_STATUS.IS_NOT_IN_CART);
    } catch (err) {
      console.warn(err);
      setIsAddedInCart(IS_IN_CART_STATUS.ERROR);
    }
  };

  const addProduct = async () => {
    try {
      const res = await ctx.cart.addProduct.fetch({
        jwt: statusAuth.jwt,
        productId,
      });
      if (res.error) {
        throw res;
      }
      setIsAddedInCart(IS_IN_CART_STATUS.IS_IN_CART);
    } catch (err) {
      console.warn(err);
      setIsAddedInCart(IS_IN_CART_STATUS.ERROR);
    }
  };
  useEffect(() => {
    ctx.cart.productIsAdded
      .fetch({
        jwt: statusAuth.jwt,
        productId,
      })
      .then((res) => {
        res.isAdded
          ? setIsAddedInCart(IS_IN_CART_STATUS.IS_IN_CART)
          : setIsAddedInCart(IS_IN_CART_STATUS.IS_NOT_IN_CART);
      })
      .catch((err) => {
        console.warn(err);
        setIsAddedInCart(IS_IN_CART_STATUS.ERROR);
      });
  }, []);
  if (isAddedInCart === IS_IN_CART_STATUS.ERROR) {
    return <Notice text="Ocurrió un error en el carrito :'(" />;
  }
  if (isAddedInCart === IS_IN_CART_STATUS.IS_IN_CART) {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 16 16"
        className="cursor-pointer fill-cyan-500"
        onClick={removeProduct}
      >
        <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
      </svg>
    );
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 16 16"
      className="cursor-pointer fill-neutral-400"
      onClick={addProduct}
    >
      <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
    </svg>
  );
};
