import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "./Schemas/RegisterSchema.js";
import Input from "./Components/Input";
import MaskedInput from "./Components/MaskedInput";
import Button from "./Components/Button";
import Card from "./Components/Card";

export default function App() {
  const [cadastroSucesso, setCadastroSucesso] = useState(false);
  const [cadastros, setCadastros] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      tipoPessoa: "Física",
      nome: "",
      sobrenome: "",
      email: "",
      email_confirm: "",
      senha: "",
      senha_confirm: "",
      documento: "",
      telefone: "",
    },
  });

  const onValidSubmit = (data) => {
    const cadastrosAtuais = [...cadastros];
    let novosCadastros;

    if (editingIndex !== null) {
      cadastrosAtuais[editingIndex] = data;
      novosCadastros = cadastrosAtuais;
      setEditingIndex(null);
    } else {
      novosCadastros = [...cadastrosAtuais, data];
    }

    localStorage.setItem("cadastros", JSON.stringify(novosCadastros));
    setCadastros(novosCadastros);

    setCadastroSucesso(true);
    reset();
    setTimeout(() => setCadastroSucesso(false), 5000);
  };

  const tipoPessoa = watch("tipoPessoa");

  useEffect(() => {
    setValue("documento", "");
  }, [tipoPessoa, setValue]);

  useEffect(() => {
    const cadastrosSalvos = localStorage.getItem("cadastros");
    try {
      if (cadastrosSalvos) {
        setCadastros(JSON.parse(cadastrosSalvos));
      }
    } catch (error) {
      console.error("Erro ao carregar cadastros do localStorage:", error);
      localStorage.removeItem("cadastros");
    }
  }, []);

  const handleEdit = (index) => {
    setEditingIndex(index);
    const cadastroParaEditar = cadastros[index];
    reset(cadastroParaEditar);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (indexToDelete) => {
    const novosCadastros = cadastros.filter(
      (_, index) => index !== indexToDelete
    );
    localStorage.setItem("cadastros", JSON.stringify(novosCadastros));
    setCadastros(novosCadastros);
  };

  const idCampo = tipoPessoa === "Física" ? "cpf" : "cnpj";
  const campo = tipoPessoa === "Física" ? "CPF *" : "CNPJ *";
  const mascaraCampo =
    tipoPessoa === "Física" ? "000.000.000-00" : "00.000.000/0000-00";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-start p-4 pt-12">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-4xl mb-12">
        {cadastroSucesso && (
          <div
            className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 rounded-md"
            role="alert"
          >
            <p className="font-bold">Cadastro realizado com sucesso!</p>
            <p>Seus dados foram salvos.</p>
          </div>
        )}
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Cadastro de pessoas
        </h1>
        <form onSubmit={handleSubmit(onValidSubmit)}>
          <div className="space-y-6">
            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <Input
                id="nome"
                label="Nome *"
                placeholder="Seu nome"
                icon="fas fa-user"
                length={15}
                error={errors.nome?.message}
                {...register("nome")}
              />
              <Input
                id="sobrenome"
                icon="fas fa-user"
                label="Sobrenome"
                placeholder="Seu sobrenome"
                length={35}
                {...register("sobrenome")}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <Input
                id="email"
                label="Email *"
                type="email"
                icon="fas fa-envelope"
                placeholder="seu@email.com"
                length={50}
                error={errors.email?.message}
                {...register("email")}
              />
              <Input
                icon="fas fa-envelope"
                id="email_confirm"
                label="Confirmar email *"
                type="email"
                placeholder="Confirme seu email"
                length={50}
                error={errors.email_confirm?.message}
                {...register("email_confirm")}
              />
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <Input
                id="senha"
                label="Senha *"
                type="password"
                icon="fas fa-lock"
                placeholder="Crie uma senha"
                length={20}
                error={errors.senha?.message}
                {...register("senha")}
              />
              <Input
                icon="fas fa-lock"
                id="senha_confirm"
                label="Confirmar senha *"
                type="password"
                placeholder="Confirme a senha"
                length={20}
                error={errors.senha_confirm?.message}
                {...register("senha_confirm")}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 text-center mb-1">
                Tipo de Pessoa
              </label>
              {errors.tipoPessoa && (
                <p className="text-red-500 text-sm text-center">
                  {errors.tipoPessoa.message}
                </p>
              )}
              <div className="mt-2 flex items-center justify-center space-x-6">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pessoa_f"
                    value="Física"
                    {...register("tipoPessoa")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="pessoa_f"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Física
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="pessoa_j"
                    value="Jurídica"
                    {...register("tipoPessoa")}
                    className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                  />
                  <label
                    htmlFor="pessoa_j"
                    className="ml-2 block text-sm text-gray-900"
                  >
                    Jurídica
                  </label>
                </div>
              </div>
            </div>

            <div className="flex flex-col md:flex-row md:space-x-4 space-y-6 md:space-y-0">
              <Controller
                name="documento"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    id={idCampo}
                    label={campo}
                    placeholder={campo}
                    icon="fas fa-id-card"
                    mask={mascaraCampo}
                    value={field.value}
                    onAccept={field.onChange}
                    error={errors.documento?.message}
                  />
                )}
              />
              <Controller
                name="telefone"
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    id="telefone"
                    label="Telefone *"
                    placeholder="(XX) XXXXX-XXXX"
                    icon="fas fa-phone"
                    mask="(00) 00000-0000"
                    value={field.value}
                    onAccept={field.onChange}
                    error={errors.telefone?.message}
                  />
                )}
              />
            </div>

            <div className="flex justify-center">
              <Button type="submit">
                {editingIndex !== null ? "Salvar Alterações" : "Cadastrar"}
              </Button>
            </div>
          </div>
        </form>
      </div>

      {cadastros.length > 0 && (
        <div className="w-full max-w-4xl">
          <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
            Cadastros Realizados
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cadastros.map((cadastro, index) => (
              <Card
                key={index}
                data={cadastro}
                onEdit={() => handleEdit(index)}
                onDelete={() => handleDelete(index)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
