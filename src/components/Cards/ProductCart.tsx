import {DeleteIcon} from "components/Icons/Delete";

export const ProductCart = () => {
  return(
    <article className="p-2 w-full inline-block bg-neutral-100 shadow-md shadow-neutral-300 flex gap-2">
      <div className="h-48 w-48 bg-neutral-300 rounded-lg"></div>
      <div className="grow">
	<h4 className="text-lg font-bold">Zapatos</h4>
	<ul className="pl-2">
	  <li className="mb-1">Inventario: 10</li>
	  <li className="mb-1">MXN 750</li>
	  <li className="mb-1">Seleccionados: 1</li>
	</ul>
      </div>
      <div>
	<DeleteIcon size={24} action={() => console.log('delete')}/>
      </div>
    </article>
  );
}
