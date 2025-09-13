import { z } from "zod";

export const RegisterSchema = z
  .object({
    nome: z
      .string()
      .min(2, { message: "Nome deve possuir no mínimo 2 caracteres." })
      .transform((nome) =>
        nome
          .trim()
          .split(" ")
          .map((palavra) => palavra.charAt(0).toUpperCase() + palavra.slice(1))
          .join(" ")
      ),
    email: z
      .email({ message: "Email inválido." })
      .min(1, { message: "O email é obrigatório." }),
    email_confirm: z
      .email({ message: "Email de confirmação inválido." })
      .min(1, { message: "A confirmação do email é obrigatória." }),
    senha: z
      .string()
      .min(8, { message: "A senha deve possuir no mínimo 8 caracteres." })
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&._-])[A-Za-z\d@$!%*?&._-]{8,}$/,
        { message: "A senha deve conter letras, números e símbolos." }
      ),
    senha_confirm: z
      .string()
      .min(1, { message: "A confirmação da senha é obrigatória." }),
    tipoPessoa: z.enum(["Física", "Jurídica"], {
      required_error: "Selecione o tipo de pessoa.",
    }),
    documento: z.string().min(1, { message: "O documento é obrigatório." }),
    telefone: z
      .string()
      .min(1, { message: "O telefone é obrigatório." })
      .refine((val) => val.replace(/\D/g, "").length >= 10, {
        message: "O telefone é obrigatório.",
      }),
  })
  .refine((data) => data.email === data.email_confirm, {
    message: "Os emails não correspondem.",
    path: ["email_confirm"],
  })
  .refine((data) => data.senha === data.senha_confirm, {
    message: "As senhas não correspondem.",
    path: ["senha_confirm"],
  })
  .superRefine((data, ctx) => {
    const doc = data.documento.replace(/\D/g, "");
    if (data.tipoPessoa === "Física" && doc.length !== 11) {
      ctx.addIssue({
        code: "custom",
        path: ["documento"],
        message: "CPF inválido. Deve conter 11 dígitos.",
      });
    }
    if (data.tipoPessoa === "Jurídica" && doc.length !== 14) {
      ctx.addIssue({
        code: "custom",
        path: ["documento"],
        message: "CNPJ inválido. Deve conter 14 dígitos.",
      });
    }
  });
