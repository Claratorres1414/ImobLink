import { useEffect, useState } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";

function MeusAnuncios() {
  const navigate = useNavigate();
  const [meusPosts, setMeusPosts] = useState([]);
  const [descricao, setDescricao] = useState("");
  const [preco, setPreco] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [bairro, setBairro] = useState("");
  const [imagem, setImagem] = useState(null);
  const [modoCriar, setModoCriar] = useState(false);

  const carregarPosts = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/api/posts/my-posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setMeusPosts(data);
    } catch (error) {
      console.error("Erro ao buscar os posts:", error);
    }
  };

  useEffect(() => {
    carregarPosts();
  }, []);

  const handlePublicar = async (e) => {
    e.preventDefault();

    if (!descricao || !preco || !rua || !numero || !bairro || !imagem) {
      alert("Preencha todos os campos!");
      return;
    }

    if (parseFloat(preco) <= 0) {
      alert("O preço deve ser um número positivo.");
      return;
    }

    const formData = new FormData();
    formData.append("description", descricao);
    formData.append("price", preco);
    formData.append("street", rua);
    formData.append("number", numero);
    formData.append("neighborhood", bairro);
    formData.append("image", imagem);

    const token = localStorage.getItem("token");
    try {
      const res = await fetch("http://localhost:8080/api/posts/create", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        alert("Postagem criada com sucesso!");
        setDescricao("");
        setPreco("");
        setRua("");
        setNumero("");
        setBairro("");
        setImagem(null);
        setModoCriar(false);
        carregarPosts();
      } else {
        alert("Erro ao criar postagem.");
      }
    } catch (error) {
      console.error("Erro ao publicar:", error);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-gray-700">Meus Anúncios</h1>

        {meusPosts.length === 0 || modoCriar ? (
          <form onSubmit={handlePublicar} className="bg-white rounded shadow p-6 space-y-4">
            <h2 className="text-xl font-semibold text-gray-800">Nova Publicação</h2>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="Descrição do imóvel"
              value={descricao}
              onChange={(e) => setDescricao(e.target.value)}
            />
            <input
              type="number"
              className="w-full border p-2 rounded"
              placeholder="Preço R$"
              value={preco}
              onChange={(e) => setPreco(e.target.value)}
              min="1"
            />
            <div className="flex gap-2">
              <input
                type="text"
                className="flex-1 border p-2 rounded"
                placeholder="Rua"
                value={rua}
                onChange={(e) => setRua(e.target.value)}
              />
              <input
                type="text"
                className="w-24 border p-2 rounded"
                placeholder="Nº"
                value={numero}
                onChange={(e) => setNumero(e.target.value)}
              />
            </div>
            <input
              type="text"
              className="w-full border p-2 rounded"
              placeholder="Bairro"
              value={bairro}
              onChange={(e) => setBairro(e.target.value)}
            />
            <input
              type="file"
              className="w-full border p-2 rounded"
              onChange={(e) => setImagem(e.target.files[0])}
            />
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Publicar
            </button>
          </form>
        ) : (
          <>
            <button
              onClick={() => setModoCriar(true)}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Nova Publicação
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {meusPosts.map((post) => (
                <div
                  key={post.id}
                  className="bg-white rounded shadow p-4 flex flex-col gap-2"
                >
                  <img
                    src={`http://localhost:8080/api/posts/${post.id}/image`}
                    alt="imagem do imóvel"
                    className="w-full h-48 object-cover rounded"
                  />
                  <h3 className="text-xl font-semibold text-gray-800">R$ {post.price}</h3>
                  <p className="text-gray-700">{post.description}</p>
                  <p className="text-gray-600 text-sm">
                    Local: {post.street}, {post.number} - {post.neighborhood}
                  </p>
                  <p className="text-gray-500 text-xs">
                    Publicado em: {format(new Date(post.createdAt), "dd/MM/yyyy")}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default MeusAnuncios;
