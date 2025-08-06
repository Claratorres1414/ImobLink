import os
import requests
from PIL import Image
import torch
from dotenv import load_dotenv
from transformers import BlipProcessor, BlipForConditionalGeneration

# Carrega variáveis de ambiente (para usar o token)
load_dotenv()

import requests

def obter_token():
    try:
        resposta = requests.get("http://localhost:8080/token?auth=segredo123")
        if resposta.status_code == 200:
            data = resposta.json()
            return data.get("token")
        else:
            print(f"Erro ao obter token: {resposta.status_code}")
            return None
    except Exception as e:
        print(f"Erro de conexão ao obter token: {e}")
        return None


HUGGINGFACE_API_TOKEN = obter_token()

if not HUGGINGFACE_API_TOKEN:
    raise RuntimeError("Token não obtido da API Java")



# Inicializa o modelo e processador BLIP
processor = BlipProcessor.from_pretrained("Salesforce/blip-image-captioning-base")
model = BlipForConditionalGeneration.from_pretrained("Salesforce/blip-image-captioning-base")

def gerar_legenda_blip(caminho_imagem, max_length=300):
    imagem = Image.open(caminho_imagem).convert("RGB")
    inputs = processor(images=imagem, return_tensors="pt")

    with torch.no_grad():
        output = model.generate(
            **inputs,
            max_length=max_length,
            num_beams=5,
            no_repeat_ngram_size=2,
            early_stopping=True
        )

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
        try:
            traducao = response.json()[0]["translation_text"]
            return traducao
        except Exception as e:
            return f"[Erro ao processar resposta da tradução: {e}]"
    else:
        return f"[Erro na tradução: {response.status_code} - {response.text}]"

def gerar_legendas_completas(caminho_imagem):
    legenda_en = gerar_legenda_blip(caminho_imagem)
    legenda_pt = traduzir_para_portugues(legenda_en)
    return {"legenda_en": legenda_en, "legenda_pt": legenda_pt}
