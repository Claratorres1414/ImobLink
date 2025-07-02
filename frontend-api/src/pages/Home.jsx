import DashboardLayout from "../components/DashboardLayout";

function Home() {
  return (
    <DashboardLayout>
      {/* Card de imóvel */}
      <div className="bg-white p-4 rounded shadow">
        <img src="/casateste2.jpeg" alt="Imóvel" className="w-full h-85 object-cover rounded mb-4" />
        <h2 className="text-xl font-bold">Casa com 3 quartos - Cohab</h2>
        <p className="text-gray-600">Preço: R$ 1.200/mês</p>
        <p className="text-gray-600">Data de Publicação: 09/10/1500</p>
        <p className="text-gray-600">Descrição: Perto de mercados, farmácias e escolas</p>
      </div>

      {/* Card de publicação */}
      <div className="bg-white p-4 rounded shadow">
        <p className="font-semibold">João comentou:</p>
        <p>"Ótimo apartamento, muito bem localizado"</p>
      </div>
    </DashboardLayout>
  );
}

export default Home;
