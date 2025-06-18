import easyocr
import re
import json

def extrair_nome(resultados):
    """
    Extrai o nome tentando encontrar a string após a palavra 'NOME',
    ignorando a filiação ou outras linhas seguintes.
    """
    texto_tudo = " ".join([r[1] for r in resultados])

    # Expressão para capturar a linha após "NOME" e antes de palavras-chave ou quebra
    match = re.search(r'nome\s*[:\-]?\s*([A-ZÀ-Úa-zà-ú\s]{5,}?)(?=\s+(fili|data|natu|org|sexo|nome da mãe|observa|$))', texto_tudo, re.IGNORECASE)
    
    if match:
        nome = match.group(1).strip()
        if len(nome.split()) >= 2:
            return nome

    # Alternativa: maior texto que parece um nome
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

    # Lê frente
    frente_resultados = reader.readtext(frente_path, paragraph=True)
    frente_texto = " ".join([r[1] for r in frente_resultados])

    # Lê verso
    verso_resultados = reader.readtext(verso_path, paragraph=True)
    verso_texto = " ".join([r[1] for r in verso_resultados])

    # Texto combinado
    texto_total = frente_texto + " " + verso_texto

    # Extrações
    nome = extrair_nome(frente_resultados)
    data_nascimento = extrair_data_nascimento(texto_total)
    cpf = extrair_cpf(texto_total)

    return {
        "nome": nome,
        "data_nascimento": data_nascimento,
        "cpf": cpf
    }

# === EXECUÇÃO LOCAL ===
if __name__ == "__main__":
    frente = "frente.jpg"  # Caminho da frente
    verso = "costa.jpg"    # Caminho do verso

    dados_extraidos = processar_documento(frente, verso)

    print("\n📋 DADOS EXTRAÍDOS:")
    print(json.dumps(dados_extraidos, indent=4, ensure_ascii=False))
