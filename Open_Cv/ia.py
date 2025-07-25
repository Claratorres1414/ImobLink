import os
import requests
from PIL import Image
import torch
from dotenv import load_dotenv
from transformers import BlipProcessor, BlipForConditionalGeneration

# === Carrega variáveis de ambiente ===
load_dotenv()
HUGGINGFACE_API_TOKEN = os.getenv("HUGGINGFACE_API_TOKEN")

# === Carrega BLIP base ===
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def gerar_legenda(caminho_imagem, max_length=100):
    imagem = Image.open(caminho_imagem).convert("RGB")
    inputs = processor(images=imagem, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(**inputs, max_length=max_length)

    legenda_ingles = processor.decode(output[0], skip_special_tokens=True)
    return legenda_ingles.strip()

def traduzir_para_portugues(texto_ingles):
    url = "https://api-inference.huggingface.co/models/Helsinki-NLP/opus-mt-tc-big-en-pt"
    headers = {
        "Authorization": f"Bearer {HUGGINGFACE_API_TOKEN}",
        "Content-Type": "application/json"
    }
    payload = {"inputs": texto_ingles}
    response = requests.post(url, headers=headers, json=payload)

    if response.status_code == 200:
        traducao = response.json()[0]["translation_text"]
        return traducao
    else:
        return f"[Erro na tradução: {response.status_code}]"

if __name__ == "__main__":
    legenda_en = gerar_legenda("casaa.jpg", max_length=100)
    print("Legenda (EN):", legenda_en)

    legenda_pt = traduzir_para_portugues(legenda_en)
    print("Legenda (PT):", legenda_pt)
