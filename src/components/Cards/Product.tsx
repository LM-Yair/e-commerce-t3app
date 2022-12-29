import { LinkText } from "components/Links/LinkText";
import { Product } from "interfaces/product/product";

type ProductCardProps = Omit<
  Product,
  "id" | "description" | "inventary" | "createdAt" | "updatedAt"
>;

export const Productcard = ({ name, price, slug }: ProductCardProps) => {
  return (
    <article className="inline-block w-56 rounded-lg bg-neutral-100 p-2.5 text-neutral-800 shadow-md shadow-neutral-300">
      <div className="h-48 rounded-lg bg-neutral-300"></div>
      <div className="flex flex-col">
        <p className="py-1 text-lg font-bold text-neutral-800">
          <LinkText type="NextLink" text={name} href={`/producto/${slug}`} />
        </p>
        <ul className="pl-2">
          <li>MXN {price}</li>
        </ul>
      </div>
    </article>
  );
};
