import * as yup from "yup";

export const schema = yup.object().shape({
  description: yup.string().required("Descrição é obrigatórioa"),
  value: yup
    .number()
    .min(0.01, "Deve ser no mínimo R$ 0,01")
    .required("Valor é obrigatório"),
  typeId: yup
    .number()
    .min(1, "Selecione um tipo de transação")
    .required("Tipo de transação é obrigatório"),
  categoryId: yup
    .number()
    .min(1, "Selecione uma categoria de transação")
    .required("Categoria de transação é obrigatório"),
});
