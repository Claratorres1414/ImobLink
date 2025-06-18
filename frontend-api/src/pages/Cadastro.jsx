import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa";

function Cadastro() {
  return (
    <div className="min-h-screen grid grid-cols-1 md:grid-cols-2 bg-cover bg-center relative" style={{ backgroundImage: "url('/fundo.jpg')" }}>
      {/* Camada escura */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* formulario de cadastro na esquerda */}
      <div className="flex items-center justify-center z-10 p-6">
        <div className="bg-white p-6 rounded shadow-md w-full max-w-md animate-fade-in">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaUserPlus /> Cadastro
          </h2>
          <form className="space-y-4">
            <input type="text" placeholder="Nome completo" className="w-full border p-2 rounded" />
            <input type="email" placeholder="E-mail" className="w-full border p-2 rounded" />
            <input type="text" placeholder="CPF" className="w-full border p-2 rounded" />
            <input type="tel" placeholder="Telefone" className="w-full border p-2 rounded" />
            <input type="password" placeholder="Senha" className="w-full border p-2 rounded" />
            <button className="w-full bg-green-600 text-white p-2 rounded hover:bg-green-700">
              Cadastrar
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Já tem uma conta?{" "}
            <Link to="/" className="text-green-600 underline">
              Logar
            </Link>
          </p>
        </div>
      </div>

      {/*  textinho na direita */}
      <div className="hidden md:flex flex-col justify-center items-center text-white z-10 p-10">
        <FaUserPlus className="text-6xl mb-4" />
        <h1 className="text-4xl font-bold mb-4">Crie sua conta</h1>
        <p className="text-lg text-center">Comece agora a anunciar ou encontrar imóveis com o ImobLink.</p>
      </div>
    </div>
  );
}

export default Cadastro;
