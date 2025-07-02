import DashboardLayout from "../components/DashboardLayout";

function Perfil() {
  return (
    <DashboardLayout>
      <div className="bg-white rounded-lg shadow-lg p-6 flex max-w-4xl mx-auto">
        {/* Foto de perfil */}
        <div className="w-1/3 flex justify-center items-start">
          <img
            src="/imagemperfil.jpg"
            alt="Foto de perfil"
            className="w-40 h-40 rounded-lg border-2 border-gray-300 object-cover"
          />
        </div>

        {/* Informações */}
        <div className="w-2/3 pl-6 space-y-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Mateus Barros</h2>
            <p className="text-gray-600"> Telefone: (81) 99999-9999</p>
            <p className="text-gray-600"> Email: mateus@email.com</p>
            <p className="text-gray-600"> Administrador </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-700 mb-1">Bio:</h3>
            <div className="border border-gray-300 rounded p-3 text-gray-700 bg-gray-50 text-sm">
              Estudante de Engenharia apaixonado por tecnologia, design e inovação.
              Sempre buscando aprender mais e transformar ideias em realidade.
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Perfil;
