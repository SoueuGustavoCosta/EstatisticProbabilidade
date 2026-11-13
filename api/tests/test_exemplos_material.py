"""Todo exemplo resolvido do material precisa passar.

Quando o exemplo tem 'valor_correto', o material tem erro (docs/08) e o teste
confere o valor correto. `executar` chama o mesmo módulo que a rota POST /api/calcular
usa e lê cada chave esperada em `resultados` (id -> valor).
"""
import json
from pathlib import Path

import pytest
from fastapi.testclient import TestClient

from api.core.entrada import ler_numeros
from api.core.teclas import teclas
from api.index import MODULOS, app

RAIZ = Path(__file__).parents[2]
DADOS = json.loads((RAIZ / "data" / "exemplos_material.json").read_text(encoding="utf-8"))
EXEMPLOS = DADOS["exemplos"]
cliente = TestClient(app)


def esperado(ex):
    return ex.get("valor_correto") or ex["esperado_no_material"]


def executar(ex):
    resposta = MODULOS[ex["modulo"]]({**ex["entrada"], "modulo": ex["modulo"], "casas": 2})
    return {r["id"]: r["valor"] for r in resposta["resultados"]}


def confere(obtido, valor, tol, chave):
    if isinstance(valor, bool) or not isinstance(valor, (int, float, list)):
        assert obtido == valor, chave
    elif isinstance(valor, list):
        assert len(obtido) == len(valor), chave
        for o, v in zip(obtido, valor):
            confere(o, v, tol, chave)
    else:
        assert abs(obtido - valor) <= tol, f"{chave}: obtido {obtido}, esperado {valor}"


@pytest.mark.parametrize("ex", EXEMPLOS, ids=[e["id"] for e in EXEMPLOS])
def test_exemplo_do_material(ex):
    obtido = executar(ex)
    for chave, valor in esperado(ex).items():
        assert chave in obtido, f"resultado '{chave}' não foi devolvido"
        confere(obtido[chave], valor, ex["tolerancia"], chave)


def test_tabela_z_completa():
    z = json.loads((RAIZ / "data" / "tabela_z.json").read_text(encoding="utf-8"))["tabela"]
    assert len(z) == 310 and z["2.00"] == 0.4772 and z["1.00"] == 0.3413


# ---------- exercícios extras do gabarito (docs/02) ----------
def test_normal_gabarito_u6_q7_e_q8_batem():
    # coberto pelos exemplos normal_salario e normal_diametro; aqui só garantimos os passos da tabela Z
    r = MODULOS["normal"]({"modulo": "normal", "mu": 100, "variancia": 0.04, "a": 99.98, "b": 100.04})
    tabelas = [p["tabela"] for p in r["passos"] if p["tabela"] and p["tabela"].get("tipo") == "tabela_z"]
    assert [t["chave"] for t in tabelas] == ["0.10", "0.20"]


def test_gabarito_u4_q7_q8_valores_corretos():
    r = MODULOS["dados_brutos"]({"modulo": "dados_brutos", "tipo_dados": "populacao", "valores": [2, 2, 3, 4, 5, 5, 14]})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert abs(obtido["as_momento"] - 1.66) < 0.01 and abs(obtido["as_pearson2"] - 0.78) < 0.01
    assert obtido["Q3"] == 5
    assert any("E-04" in (p["aviso_material"] or "") for p in r["passos"])


def test_gabarito_u4_quartis_notas():
    r = MODULOS["dados_brutos"]({"modulo": "dados_brutos", "tipo_dados": "amostra", "valores": [6, 6, 7, 5, 10, 8, 8, 6, 5, 8, 8]})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert (obtido["Q1"], obtido["Q2"], obtido["Q3"]) == (6, 7, 8)


def test_binomial_u6_q5_aviso_e_valor_exato():
    r = MODULOS["binomial"]({"modulo": "binomial", "n": 10, "p": "0.05", "k": 2})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert abs(obtido["P"] - 0.0746) < 0.0001
    assert any("E-05" in (p["aviso_material"] or "") for p in r["passos"])


def test_binomial_faixa():
    r = MODULOS["binomial"]({"modulo": "binomial", "n": 3, "p": "1/2", "k": "≥ 2"})
    assert {x["id"]: x["valor"] for x in r["resultados"]}["P"] == 0.5


def test_estratificada_arredonda_para_cima_e_avisa():
    r = MODULOS["amostragem_estratificada"]({"modulo": "amostragem_estratificada", "estratos": {"A": 100, "B": 100, "C": 50}, "n": 7})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert (obtido["A"], obtido["B"], obtido["C"]) == (3, 3, 2) and r["avisos"]


def test_sistematica_arredonda_para_baixo():
    r = MODULOS["amostragem_sistematica"]({"modulo": "amostragem_sistematica", "N": 1005, "n": 100})
    assert {x["id"]: x["valor"] for x in r["resultados"]}["k"] == 10


def test_montar_classes_reproduz_o_material():
    r = MODULOS["montar_classes"]({"modulo": "montar_classes", "valores": EXEMPLOS[5]["entrada"]["valores"]})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert (obtido["K"], obtido["h"], obtido["ni"]) == (4, 16, [3, 5, 7, 5])


def test_ponto_medio_colchete_p01():
    r = MODULOS["tabela_classes"]({"modulo": "tabela_classes", "classes": [[16, 20, 4], [20, 24, 6]], "intervalo": "[a,b)"})
    assert {x["id"]: x["valor"] for x in r["resultados"]}["pontos_medios"] == [17.5, 21.5]


def test_tabela_frequencia_com_ni_na_variancia():
    r = MODULOS["tabela_frequencia"]({"modulo": "tabela_frequencia", "tipo_dados": "populacao", "tabela": [[1, 2], [2, 3], [3, 1]]})
    obtido = {x["id"]: x["valor"] for x in r["resultados"]}
    assert obtido["n"] == 6 and abs(obtido["media"] - 11 / 6) < 1e-9 and obtido["moda"] == [2]


# ---------- avisos do material ----------
@pytest.mark.parametrize("modulo,entrada,codigo", [
    ("dados_brutos", {"tipo_dados": "amostra", "valores": [84, 67, 80, 33, 78, 96, 49, 74, 65, 41, 81, 66, 50, 91, 59, 71, 94, 41, 52, 56]}, "E-06"),
    ("dados_brutos", {"tipo_dados": "populacao", "valores": [2, 3, 4]}, "E-01"),
    ("dados_brutos", {"tipo_dados": "amostra", "valores": [2, 3, 4, 1, 2]}, "E-02"),
    ("normal", {"mu": 2000, "sigma": 200, "a": 2000, "b": 2400}, "E-03"),
    ("momento_assimetria", {"valores": [2, 3, 4]}, "E-01"),
    ("coef_quartil", {"valores": [2, 3, 4, 1, 2]}, "E-02"),
])
def test_aviso_do_material(modulo, entrada, codigo):
    r = MODULOS[modulo]({"modulo": modulo, **entrada})
    assert any(codigo in (p["aviso_material"] or "") for p in r["passos"])


# ---------- formato da resposta, entrada e erros ----------
def test_contrato_da_resposta_e_teclas():
    r = cliente.post("/api/calcular", json={"modulo": "dados_brutos", "tipo_dados": "amostra", "valores": [84, 67, 80, 33, 78, 96, 49, 74, 65, 41, 81, 66, 50, 91, 59, 71, 94, 41, 52, 56]}).json()
    assert set(r) == {"resultados", "grafico", "passos", "avisos"}
    passo_media = next(p for p in r["passos"] if p["titulo"] == "Média aritmética")
    assert passo_media["teclas_calculadora"] == ["1", "3", "2", "8", "÷", "2", "0", "="]
    assert passo_media["resultado"] == "66,4" and "84 + 67 + 80" in " ".join(p["linhas"][0] for p in r["passos"] if p["titulo"] == "Soma dos valores")
    assert all(p["fonte"] for p in r["passos"])  # Regra nº 1: toda fórmula mostra a fonte
    assert [p["n"] for p in r["passos"]] == list(range(1, len(r["passos"]) + 1))


def test_saude():
    assert cliente.get("/api/saude").json() == {"ok": True}


def test_entradas_invalidas_dao_422_amigavel():
    assert cliente.post("/api/calcular", json={"modulo": "dados_brutos", "valores": [1, 2, 3]}).status_code == 422  # falta população/amostra
    assert cliente.post("/api/calcular", json={"modulo": "dados_brutos", "tipo_dados": "amostra", "valores": [1, "abc"]}).status_code == 422
    assert cliente.post("/api/calcular", json={"modulo": "nao_existe"}).status_code == 400
    assert cliente.post("/api/calcular", json={"modulo": "binomial", "n": 5, "p": 2, "k": 1}).status_code == 422


def test_normal_fora_do_material_p08_recusa():
    r = cliente.post("/api/calcular", json={"modulo": "normal", "mu": 0, "sigma": 1, "a": 1, "b": 2})
    assert r.status_code == 422 and "não está no material" in r.json()["detail"]


def test_ler_numeros_formatos_do_material():
    assert [str(x) for x in ler_numeros("84 – 67 – 80")] == ["84", "67", "80"]
    assert [str(x) for x in ler_numeros("84, 67; 80\n56,75")] == ["84", "67", "80", "227/4"]
    with pytest.raises(ValueError):
        ler_numeros("12 abc")


def test_teclas_negativo():
    assert teclas("-5+3") == ["(−)", "5", "+", "3", "="]
