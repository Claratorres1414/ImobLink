import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaUserShield } from "react-icons/fa";

function Login() {
  const navigate = useNavigate();
  const [emailOuCpf, setEmailOuCpf] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  

  const handleLogin = async (e) => {
    e.preventDefault();
    
    if (!emailOuCpf || !senha) {
    setErro("Preencha todos os campos.");
    return;
  }

  // Login fictício por enquanto
  localStorage.setItem("token", "fake-token");
  navigate("/home");


    try {
      const resposta = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login: emailOuCpf, senha }),
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        localStorage.setItem("token", dados.token);
        navigate("/home");
      } else {
        setErro(dados.mensagem || "Login inválido");
      }
    } catch (err) {
      setErro("Erro ao conectar com o servidor");
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-cover bg-center relative" style={{ backgroundImage: "url('/fundo.jpg')" }}>
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      <div className="hidden md:flex flex-col justify-center items-center text-white z-10 p-10">
        <FaUserShield className="text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao ImobLink</h1>
        <p className="text-lg text-center">O jeito moderno de alugar e vender imóveis</p>
      </div>

      <div className="flex items-center justify-center z-10 p-6">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUserShield /> Login
          </h2>
          {erro && <p className="text-red-500 text-sm mb-2">{erro}</p>}
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="text"
              placeholder="E-mail ou CPF"
              className="w-full border p-2 rounded"
              value={emailOuCpf}
              onChange={(e) => setEmailOuCpf(e.target.value)}
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full border p-2 rounded"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
            <button className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
              Entrar
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Não tem uma conta?{" "}
            <Link to="/cadastro" className="text-blue-600 underline">
              Cadastre-se
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
