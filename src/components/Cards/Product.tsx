import {CartIcon} from "components/Icons/Cart";

export const Product = () => {
  return(
    <article className="p-2 w-56 text-neutral-800 bg-neutral-100 inline-block shadow-md shadow-neutral-300 rounded-lg">
      <div className="h-48 bg-neutral-300 rounded-lg"></div>
      <div className="flex flex-col">
	<h4 className="text-md font-bold">Zapatos</h4>
	<ul className="pl-2">
	  <li>MXN 750</li>
	</ul>
      </div>
      <div className="pt-2 flex flex-wrap gap-2">
	<CartIcon size={24} action={() => console.log('cart')} />
      </div>
    </article>
  );
}
