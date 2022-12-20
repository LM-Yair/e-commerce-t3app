import { z } from "zod";
import { trpc } from "utils/trpc";

import { Form } from "components/Form/Form";
import { InputText } from "components/Form/InputText";
import { Submit } from "components/Form/Submit";
import { TextArea } from "components/Form/TextArea";
import { InputNumber } from "components/Form/InputNumber";
import { useContext } from "react";
import { AuthContext } from "context/auth/AuthContext";

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

export const CreateProductForm = () => {
  const userAuth = useContext(AuthContext);
  const ctx = trpc.useContext();
  return (
    <Form
      formInit={{
        initialState: initialvalue,
        stateToReset: initialvalue,
        validationShape: inputsValidations,
        submitPrevented: async (resetForm, values) => {
          try {
            const productCreated = await ctx.product.create.fetch({
              jwt: userAuth.statusAuth.jwt,
              name: typeof values.name === "string" ? values.name : "",
              description:
                typeof values.description === "string"
                  ? values.description
                  : "",
              price: typeof values.price === "number" ? values.price : 0,
              inventary:
                typeof values.inventary === "number" ? values.inventary : 0,
            });
            console.log({ productCreated });
            resetForm();
          } catch (e) {
            console.warn(e);
          }
        },
      }}
      className="mx-auto w-full max-w-[30rem] p-4 text-neutral-700"
    >
      <h2 className="mb-4 border-l-4 border-cyan-500 pl-10 text-xl font-bold text-neutral-500">
        Añade un nuevo producto
      </h2>
      <InputText
        label="Nombre del producto:"
        name="name"
        alert="Coloca un nombre más especifico"
        className="w-full rounded-lg p-4 text-neutral-500 outline-none"
      />
      <TextArea
        label="Descripción:"
        name="description"
        alert="Debes de ser más descriptivo"
        className="mb-2 h-24 w-full resize-none rounded-lg p-4 text-neutral-500 outline-none"
      />
      <div className="flex justify-between gap-2">
        <InputNumber
          className="mb-2 w-full rounded-lg p-4 text-neutral-500 outline-none"
          placeholder="Precio MXN"
          name="price"
          alert="No puede ser 0 o negativo"
        />
        <InputNumber
          className="mb-2 w-full rounded-lg p-4 text-neutral-500 outline-none"
          placeholder="Inventario"
          name="inventary"
          alert="Debes tener en existencia"
        />
      </div>
      <Submit
        className="w-full rounded-lg bg-cyan-500 py-2 px-4 text-xl font-semibold text-neutral-200 hover:opacity-80 active:bg-cyan-600"
        text="Añadir"
      />
    </Form>
  );
};
