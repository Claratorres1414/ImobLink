// src/pages/PublicarPostagem.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function PublicarPostagem() {
  const [imagens, setImagens] = useState([]);
  const [preco, setPreco] = useState("");
  const [local, setLocal] = useState("");
  const [descricao, setDescricao] = useState("");
  const [mensagem, setMensagem] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      alert("Você precisa estar logado para publicar.");
      navigate("/");
      return;
    }

    const formData = new FormData();
    imagens.forEach((img) => formData.append("imagens", img));
    formData.append("preco", preco);
    formData.append("local", local);
    formData.append("descricao", descricao);
    formData.append("createdAt", new Date().toISOString()); // <- data automática

    try {
      const response = await fetch("http://localhost:8080/api/user/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        setMensagem("Publicação feita com sucesso!");
        setPreco("");
        setLocal("");
        setDescricao("");
        setImagens([]);
      } else {
        setMensagem("Erro ao publicar.");
      }
    } catch (err) {
      setMensagem("Erro de conexão com o servidor.");
    }
  };

  return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-xl space-y-4"
      >
        <h2 className="text-xl font-bold">Nova Publicação</h2>

        <input
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => setImagens([...e.target.files])}
          className="w-full"
        />

        <input
          type="text"
          placeholder="Preço (R$)"
          value={preco}
          onChange={(e) => setPreco(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <input
          type="text"
          placeholder="Localização"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="w-full border p-2 rounded"
        />

        <textarea
          placeholder="Descrição do imóvel"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full border p-2 rounded"
          rows={4}
        />

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Publicar
        </button>

        {mensagem && <p className="text-sm text-gray-700">{mensagem}</p>}
      </form>
    </div>
  );
}

export default PublicarPostagem;
