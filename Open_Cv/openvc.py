import cv2
import easyocr
import re
import json

def mostrar_imagem(caminho):
    imagem = cv2.imread(caminho)
    if imagem is None:
        print(f"Erro ao carregar a imagem: {caminho}")
        return False

    # Redimensiona para 640x480
    imagem = cv2.resize(imagem, (640, 480))

    cv2.imshow(f"Visualizando {caminho}", imagem)
    print(f"Pressione qualquer tecla para fechar a visualização de {caminho}")
    cv2.waitKey(0)
    cv2.destroyAllWindows()
    return True

def redimensionar_imagem(caminho, largura_alvo=1000):
    imagem = cv2.imread(caminho)
    if imagem is None:
        return None

    altura, largura = imagem.shape[:2]
    proporcao = largura_alvo / float(largura)
    nova_altura = int(altura * proporcao)
    
    return cv2.resize(imagem, (largura_alvo, nova_altura))


def extrair_nome(resultados):
    texto_tudo = " ".join([r[1] for r in resultados])
    match = re.search(r'nome\s*[:\-]?\s*([A-ZÀ-Úa-zà-ú\s]{5,}?)(?=\s+(fili|data|natu|org|sexo|nome da mãe|observa|$))', texto_tudo, re.IGNORECASE)
    
    if match:
        nome = match.group(1).strip()
        if len(nome.split()) >= 2:
            return nome

    candidatos = []
    for caixa in resultados:
        texto = caixa[1]
        if len(texto.split()) >= 3 and not any(char.isdigit() for char in texto):
            candidatos.append(texto)

    if candidatos:
        return max(candidatos, key=lambda x: len(x))

    return "Nome não identificado"

def extrair_data_nascimento(texto):
    match = re.search(r'(\d{2}[\/\-]\d{2}[\/\-]\d{4})', texto)
    return match.group(0) if match else "Data não identificada"

def extrair_cpf(texto):
    match = re.search(r'\d{3}[.\-]?\d{3}[.\-]?\d{3}[.\-]?\d{2}', texto)
    return match.group(0) if match else "CPF não identificado"

def processar_documento(frente_path, verso_path):
    reader = easyocr.Reader(['pt', 'en'])

    if not mostrar_imagem(frente_path) or not mostrar_imagem(verso_path):
        print("Falha ao exibir imagens.")
        return None

    frente_img = redimensionar_imagem(frente_path)
    verso_img = redimensionar_imagem(verso_path)

    if frente_img is None or verso_img is None:
        print("Erro ao redimensionar imagens.")
        return None

    frente_resultados = reader.readtext(frente_img, paragraph=True)
    frente_texto = " ".join([r[1] for r in frente_resultados])

    verso_resultados = reader.readtext(verso_img, paragraph=True)
    verso_texto = " ".join([r[1] for r in verso_resultados])

    texto_total = frente_texto + " " + verso_texto

    nome = extrair_nome(frente_resultados)
    data_nascimento = extrair_data_nascimento(texto_total)
    cpf = extrair_cpf(texto_total)

    return {
        "nome": nome,
        "data_nascimento": data_nascimento,
        "cpf": cpf
    }

# === EXECUÇÃO PRINCIPAL ===
if __name__ == "__main__":
    frente = "frente.jpg"
    verso = "costa.jpg"

    dados_extraidos = processar_documento(frente, verso)
    if dados_extraidos:
        print("\n📋 DADOS EXTRAÍDOS:")
        print(json.dumps(dados_extraidos, indent=4, ensure_ascii=False))

