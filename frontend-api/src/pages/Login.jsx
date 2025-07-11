import { useNavigate, Link } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [login, setLogin] = useState(""); // Pode ser email ou CPF
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!login || !senha) {
      setErro("Preencha todos os campos.");
      return;
    }

    try {
      const resposta = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ login, senha }), // Confirme se os nomes são esses no backend
      });

      if (!resposta.ok) {
        setErro("Login inválido. Verifique seus dados.");
        return;
      }

      const dados = await resposta.json(); // Espera o token como JSON
      localStorage.setItem("token", dados.token); // Salva o token

      navigate("/home");
    } catch (error) {
      console.error("Erro no login:", error);
      setErro("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6 text-blue-700">Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <input
            type="text"
            placeholder="E-mail ou CPF"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
          />
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            Entrar
          </button>
        </form>
        {erro && <p className="text-red-500 text-sm mt-3 text-center">{erro}</p>}
        <p className="text-center mt-4">
          Não tem uma conta?{" "}
          <Link to="/cadastro" className="text-blue-700 hover:underline">
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Login;
