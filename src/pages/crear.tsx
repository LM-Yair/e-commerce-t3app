import Head from "next/head";
import { type NextPage } from "next";
import { PageLayout } from "components/Pages/PageLayout";
import { Form } from "components/Form/Form";
import { InputText } from "components/Form/InputText";
import { z } from "zod";
import { Submit } from "components/Form/Submit";
import { TextArea } from "components/Form/TextArea";
import { InputNumber } from "components/Form/InputNumber";
import { AuthProvider } from "context/auth/AuthProvider";

const initialvalue = {
  name: "",
  description: "",
  price: 0,
  inventary: 0,
};

const inputsValidations = {
  name: z.string().min(5),
  description: z.string().min(10),
  price: z.number().positive(),
  inventary: z.number().positive(),
};

const Crear: NextPage = () => {
  return (
    <AuthProvider redirect={true} hideContentDurignValidating={true}>
      <PageLayout>
        <Head>
          <title>Crear</title>
          <meta
            name="description"
            content="Crea los productos que queras vender :D"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <section className="h-full">
          <h2 className="my-4 text-center text-xl font-bold">
            Añade un nuevo producto
          </h2>
          <Form
            formInit={{
              initialState: initialvalue,
              stateToReset: initialvalue,
              validationShape: inputsValidations,
              submitPrevented: () => console.log("Hola"),
            }}
            className="mx-auto w-96 rounded-lg bg-neutral-100 p-4 text-neutral-700 shadow-md shadow-neutral-300"
          >
            <InputText
              label="Nombre del producto:"
              name="name"
              alert="Coloca un nombre más especifico"
              className="w-full rounded-lg p-2 outline-none"
            />
            <TextArea
              label="Descripción:"
              name="description"
              alert="Debes de ser más descriptivo"
              className="h-24 w-full resize-none rounded-lg p-2 outline-none"
            />
            <div className="flex justify-between gap-2">
              <InputNumber
                className="w-full rounded-lg p-2 outline-none"
                placeholder="Precio MXN"
                name="price"
                alert="No puede ser 0 o negativo"
              />
              <InputNumber
                className="w-full rounded-lg p-2 outline-none"
                placeholder="Inventario"
                name="inventary"
                alert="Debes tener en existencia"
              />
            </div>
            <Submit
              className="mt-4 w-full rounded-lg bg-neutral-800 py-2 px-4 text-neutral-200 hover:bg-neutral-200 hover:text-neutral-800 active:bg-neutral-300"
              text="Añadir"
            />
          </Form>
        </section>
      </PageLayout>
    </AuthProvider>
  );
};

export default Crear;
