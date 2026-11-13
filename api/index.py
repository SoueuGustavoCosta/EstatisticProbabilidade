"""API do Laboratório — Trilha Estatística & Probabilidade.

Regras: ver CLAUDE.md. Só fórmulas do docs/02-conteudo-da-materia.md.
Contrato de resposta: docs/05-laboratorio-entrada-de-dados.md.
"""
import sys
from pathlib import Path

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel

# A Vercel executa api/index.py como script: garante que o pacote `api` seja encontrado.
sys.path.insert(0, str(Path(__file__).resolve().parents[1]))

from api.modulos import dados_brutos, outros, tabelas  # noqa: E402

app = FastAPI(title="Trilha Estatística API")

MODULOS = {
    "dados_brutos": dados_brutos.calcular,
    "tabela_frequencia": tabelas.tabela_frequencia,
    "tabela_classes": tabelas.tabela_classes,
    "montar_classes": tabelas.montar_classes,
    "tabela_classes_a_partir_dados": tabelas.montar_classes,
    "moda_qualitativa": tabelas.moda_qualitativa,
    "amostragem_sistematica": outros.amostragem_sistematica,
    "amostragem_estratificada": outros.amostragem_estratificada,
    "prob_classica": outros.prob_classica,
    "prob_condicional": outros.prob_condicional,
    "independencia": outros.independencia,
    "bayes": outros.bayes,
    "binomial": outros.binomial,
    "normal": outros.normal,
    "pearson2": outros.pearson2,
    "momento_assimetria": outros.momento_assimetria,
    "coef_quartil": outros.coef_quartil,
}


class Pedido(BaseModel):
    modulo: str
    casas: int = 2
    model_config = {"extra": "allow"}


@app.get("/api/saude")
def saude():
    return {"ok": True}


@app.post("/api/calcular")
def calcular(pedido: Pedido):
    func = MODULOS.get(pedido.modulo)
    if func is None:
        raise HTTPException(400, f"Módulo '{pedido.modulo}' não existe")
    try:
        return func(pedido.model_dump())
    except (ValueError, KeyError, TypeError, ZeroDivisionError) as e:
        msg = f"Faltou preencher: {e.args[0]}" if isinstance(e, KeyError) else str(e)
        raise HTTPException(422, msg)
