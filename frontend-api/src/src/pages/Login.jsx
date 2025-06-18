import { Link } from "react-router-dom";
import { FaHome, FaUserShield } from "react-icons/fa";

function Login() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-cover bg-center relative" style={{ backgroundImage: "url('/fundo.jpg')" }}>
      {/* Camada escura */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Lado esquerdo com texto */}
      <div className="hidden md:flex flex-col justify-center items-center text-white z-10 p-10 animate-fade-in">
        <FaHome className="text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-4">Bem-vindo ao ImobLink</h1>
        <p className="text-lg text-center">O jeito moderno e seguro de alugar ou vender imóveis</p>
      </div>

      {/* Formulário de login */}
      <div className="flex items-center justify-center z-10 p-6">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUserShield /> Login
          </h2>
          <form className="space-y-4">
            <input
              type="text"
              placeholder="E-mail ou CPF"
              className="w-full border p-2 rounded"
            />
            <input
              type="password"
              placeholder="Senha"
              className="w-full border p-2 rounded"
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
