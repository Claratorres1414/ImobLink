import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Cadastro() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nome: "",
    email: "",
    cpf: "",
    telefone: "",
    senha: "",
  });

  const [erro, setErro] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCadastro = async (e) => {
    e.preventDefault();

    const { nome, email, cpf, telefone, senha } = form;

    if (!nome || !email || !cpf || !telefone || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nome, email, cpf, telefone, senha }),
      });

      if (!resposta.ok) {
        setErro("Erro ao cadastrar. Verifique os dados.");
        return;
      }

      const dados = await resposta.json();
      localStorage.setItem("token", dados.token); // salva o token direto

      navigate("/home");
    } catch (error) {
      console.error("Erro no cadastro:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Cadastro</h1>
        <form onSubmit={handleCadastro} className="space-y-4">
          <input name="nome" placeholder="Nome completo" value={form.nome} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="email" placeholder="E-mail" value={form.email} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="cpf" placeholder="CPF" value={form.cpf} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="telefone" placeholder="Telefone" value={form.telefone} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <input name="senha" type="password" placeholder="Senha" value={form.senha} onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" />
          <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Cadastrar
          </button>
        </form>
        {erro && <p className="text-red-500 text-sm mt-3 text-center">{erro}</p>}
        <p className="text-center mt-4">
          Já tem uma conta?{" "}
          <Link to="/" className="text-blue-700 hover:underline">
            Logar
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Cadastro;
