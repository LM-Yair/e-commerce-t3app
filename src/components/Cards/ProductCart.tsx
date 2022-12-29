import { DeleteIcon } from "components/Icons/Delete";
import { LinkText } from "components/Links/LinkText";
import { Product } from "interfaces/product/product";

type ProductCartProps = Omit<
  Product,
  "createdAt" | "updatedAt" | "description"
> & {
  remove: (productId: string) => void;
};

export const ProductCart = ({
  id,
  name,
  slug,
  inventary,
  price,
  remove,
}: ProductCartProps) => {
  return (
    <article className="inline-block flex w-full gap-2 bg-neutral-100 p-2 shadow-md shadow-neutral-300">
      <div className="h-48 w-48 rounded-lg bg-neutral-300"></div>
      <div className="grow">
        <h4 className="text-lg font-bold">
          <LinkText text={name} href={`producto/${slug}`} />
        </h4>
        <ul className="pl-2">
          <li className="mb-1">Inventario: {inventary}</li>
          <li className="mb-1">MXN {price}</li>
          <li className="mb-1">Seleccionados: 1</li>
        </ul>
      </div>
      <div>
        <DeleteIcon size={24} action={() => remove(id)} />
      </div>
    </article>
  );
};
