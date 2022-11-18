import Head from "next/head";
import { type NextPage } from "next";
import {PageLayout} from "components/Pages/PageLayout";
import {BaseSyntheticEvent} from "react";

const Crear: NextPage = () => {
  const submit = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    console.log('Formulario');
  }
  return (
    <PageLayout>
      <Head>
        <title>Crear</title>
        <meta name="description" content="Crea los productos que queras vender :D" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="h-full">
      <h2 className="my-4 text-xl text-center font-bold">Añade un nuevo producto</h2>
	<form onSubmit={submit} className="p-4 text-neutral-600 mx-auto w-96 bg-neutral-100 shadow-md shadow-neutral-300 rounded-lg">
	  <label htmlFor="name" className="text-neutral-500">Nombre del producto:</label>
	  <input id="name" className="p-2 rounded-lg w-full outline-none" type="text" />

	  <label htmlFor="description" className="text-neutral-500">Descripción:</label>
	  <textarea 
	    id="description" 
	    name="description"
	    className="p-2 h-24 w-full resize-none rounded-lg outline-none"
	  ></textarea>
	  <div className="flex justify-between">
	    <input className="w-5/12 p-2 rounded-lg outline-none" type="text" placeholder="Precio MXN"/>
	    <input className="w-5/12 p-2 rounded-lg outline-none" type="text" placeholder="Inventario"/>
	  </div>
	  <button className="py-2 px-4 mt-4 w-full text-neutral-200 bg-neutral-800 hover:bg-neutral-200 hover:text-neutral-800 active:bg-neutral-300 rounded-lg">Añadir</button>
	</form>
      </section>
    </PageLayout>
  );
};

export default Crear;
