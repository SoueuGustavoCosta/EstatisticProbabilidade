"""L5 amostragem, L6 probabilidade, L7 binomial, L8 normal e coeficientes de assimetria avulsos."""
import math
import re

from ..core import amostragem as Am
from ..core import assimetria as A
from ..core import distribuicoes as Di
from ..core.dispersao import raiz
from ..core import posicao as P
from ..core import probabilidade as Pr
from ..core.entrada import ler_numeros
from ..core.formatacao import F, d, fmt, frac_txt
from ..core.passos import Resposta
from . import preparar


# ---------- L5 ----------
def amostragem_sistematica(pedido: dict) -> dict:
    preparar(pedido)
    k, elementos, passos, avisos = Am.sistematica(pedido["N"], pedido["n"], pedido.get("inicio"))
    r = Resposta()
    ns = [r.passo(p) for p in passos]
    r.avisos += avisos
    r.resultado("k", "Intervalo", "k", k, passo=ns[0])
    if elementos:
        r.resultado("elementos", "Elementos selecionados", "", elementos, passo=ns[1], exibicao=", ".join(map(str, elementos)))
        if len(elementos) >= 3:
            r.resultado("terceiro_elemento", "Terceiro elemento", "", elementos[2], passo=ns[1])
    return r.dict()


def amostragem_estratificada(pedido: dict) -> dict:
    preparar(pedido)
    final, passos, avisos = Am.estratificada(pedido["estratos"], pedido["n"])
    r = Resposta()
    num = r.passo(passos[0])
    r.avisos += avisos
    for nome, v in final.items():
        r.resultado(nome, nome, "", v, passo=num)
    r.resultado("total_amostra", "Total da amostra", "Σ", sum(final.values()), passo=num)
    r.grafico = {"tipo": "barras", "series": [{"x": k, "n": v} for k, v in final.items()], "marcadores": []}
    return r.dict()


# ---------- L6 ----------
def prob_classica(pedido: dict) -> dict:
    preparar(pedido)
    ps, passos = Pr.classica(pedido["favoraveis"], pedido["total"])
    r = Resposta()
    nums = [r.passo(p) for p in passos]
    unico = not isinstance(pedido["favoraveis"], (list, tuple))
    r.resultado("P", "Probabilidade", "P(A)", frac_txt(ps[0]) if unico else [frac_txt(p) for p in ps], passo=nums[0],
                exibicao=Pr._todas(ps[0]) if unico else " · ".join(frac_txt(p) for p in ps))
    r.resultado("P_decimal", "Em decimal", "", ps[0] if unico else ps, passo=nums[0])
    r.resultado("P_percent", "Em porcentagem", "%", ps[0] * 100 if unico else [p * 100 for p in ps], passo=nums[0])
    return r.dict()


def prob_condicional(pedido: dict) -> dict:
    preparar(pedido)
    v, p = Pr.condicional(pedido["P_A_inter_B"], pedido["P_B"])
    r = Resposta()
    n = r.passo(p)
    r.resultado("P_A_dado_B", "P(A|B)", "P(A|B)", frac_txt(v), passo=n, exibicao=Pr._todas(v))
    r.resultado("P_A_dado_B_decimal", "Em decimal", "", v, passo=n)
    return r.dict()


def independencia(pedido: dict) -> dict:
    preparar(pedido)
    ind, p = Pr.independencia(pedido["P_A"], pedido["P_B"], pedido["P_A_inter_B"])
    r = Resposta()
    n = r.passo(p)
    r.resultado("independentes", "Independentes?", "", ind, passo=n, exibicao="Sim" if ind else "Não")
    return r.dict()


def bayes(pedido: dict) -> dict:
    preparar(pedido)
    eventos, evento = {}, pedido.get("evento")
    for nome, v in pedido["eventos"].items():
        p_b = v["P"]
        outra = [k for k in v if k != "P"]
        if len(outra) != 1:
            raise ValueError(f"Para o evento {nome}, informe P e a probabilidade condicional P(E|{nome}).")
        if evento is None and (m := re.fullmatch(r"P_(.+)_dado", outra[0])):
            evento = m.group(1)
        eventos[nome] = (p_b, v[outra[0]])
    evento = evento or "E"
    alvo = pedido.get("alvo") or next(iter(eventos))
    post, num, den, passos = Pr.bayes(eventos, alvo, evento)
    r = Resposta()
    ns = [r.passo(p) for p in passos]
    r.resultado("numerador", "Numerador", "", num[alvo], passo=ns[0])
    r.resultado("denominador", "Denominador", "", den, passo=ns[1])
    r.resultado(f"P_{alvo}_dado_{evento}", f"P({alvo}|{evento})", f"P({alvo}|{evento})", post[alvo], passo=ns[2], exibicao=f"≅ {fmt(post[alvo] * 100)}%")
    for k, v in post.items():
        if k != alvo:
            r.resultado(f"P_{k}_dado_{evento}", f"P({k}|{evento})", f"P({k}|{evento})", v, passo=ns[2], exibicao=f"≅ {fmt(v * 100)}%")
    r.grafico = {"tipo": "arvore", "series": [{"evento": k, "P": float(F(e[0])), "P_cond": float(F(e[1]))} for k, e in eventos.items()], "marcadores": []}
    return r.dict()


# ---------- L7 ----------
def binomial(pedido: dict) -> dict:
    preparar(pedido)
    n = int(pedido["n"])
    P_, q, media, var, ks, todas, desc, passos = Di.binomial(n, pedido["p"], pedido["k"])
    if n == 10 and F(pedido["p"]) == F("0.05") and ks == [2]:
        passos[3].aviso_material = "⚠️ No gabarito (Unidade 6, Q5) aparece 7,65%. A conta exata dá 0,0746 = 7,46%; a alternativa B é a mais próxima. (E-05)"
    r = Resposta()
    nums = [r.passo(p) for p in passos]
    r.resultado("q", "Probabilidade de fracasso", "q", q, passo=nums[0])
    if len(ks) == 1:
        r.resultado("combinacao", "Combinação", "n!/(k!(n−k)!)", math.comb(n, ks[0]), passo=nums[1])
    r.resultado("P", f"P({desc})", "P(k)", P_, passo=nums[-2] if len(ks) > 1 else nums[3], exibicao=f"{frac_txt(P_)} ≅ {fmt(P_ * 100)}%")
    r.resultado("media", "Média", "np", media, passo=nums[-1])
    r.resultado("variancia", "Variância", "npq", var, passo=nums[-1])
    r.grafico = {"tipo": "barras", "series": [{"x": i, "n": float(v), "destaque": i in ks} for i, v in todas.items()], "marcadores": []}
    return r.dict()


# ---------- L8 ----------
def normal(pedido: dict) -> dict:
    preparar(pedido)
    za, zb, P_, passos, g = Di.normal(pedido["mu"], pedido["a"], pedido["b"], pedido.get("sigma"), pedido.get("variancia"))
    if g["mu"] == 2000 and g["sigma"] == 200 and g["a"] == 2000 and g["b"] == 2400:
        passos[-1].aviso_material = "⚠️ No material (apostila p.57, exemplo 6.2) aparece 42,72%. A tabela dá 0,4772, que é 47,72%: erro de digitação. (E-03)"
    r = Resposta()
    nums = [r.passo(p) for p in passos]
    r.resultado("z_a", "Z do limite a", "Za", za, passo=nums[-4] if len(nums) >= 4 else nums[0])
    r.resultado("z_b", "Z do limite b", "Zb", zb, passo=nums[-3] if len(nums) >= 4 else nums[0])
    r.resultado("P", "Probabilidade", "P", P_, passo=nums[-1], exibicao=fmt(P_, 4))
    r.resultado("P_percent", "Em porcentagem", "%", P_ * 100, passo=nums[-1])
    mu, s = float(g["mu"]), float(g["sigma"])
    pts = [{"x": mu + s * (i - 40) / 10, "y": math.exp(-((i - 40) / 10) ** 2 / 2) / (s * math.sqrt(2 * math.pi))} for i in range(81)]
    r.grafico = {"tipo": "sino", "series": pts, "area": [float(g["a"]), float(g["b"])], "marcadores": [{"nome": "μ", "x": mu}]}
    return r.dict()


# ---------- Coeficientes de assimetria avulsos ----------
def pearson2(pedido: dict) -> dict:
    preparar(pedido)
    m, me = F(pedido["media"]), F(pedido["mediana"])
    var = F(pedido["variancia"])
    sigma = raiz(var)
    a, c, p = A.pearson2(m, me, sigma)
    r = Resposta()
    n = r.passo(p)
    r.resultado("desvio_padrao", "Desvio padrão", "σ", sigma, passo=n)
    r.resultado("As", "2º coeficiente de Pearson", "As", a, passo=n, classificacao=A.NOMES[c])
    r.resultado("classificacao", "Classificação", "", c, passo=n, exibicao=A.NOMES[c])
    return r.dict()


def momento_assimetria(pedido: dict) -> dict:
    preparar(pedido)
    xs = ler_numeros(pedido["valores"])
    m = sum(xs) / len(xs)
    sig, _ = A.sigma_pop(xs, m)
    a, c, soma, p = A.momento(xs, m, sig)
    if sorted(xs) == [2, 3, 4]:
        p.aviso_material = "⚠️ No material (apostila p.40, exemplo 4.2) aparece As ≅ 1,21. Refazendo: (−1)³ + 0³ + 1³ = 0, então As = 0 (simétrica). (E-01)"
    r = Resposta()
    n = r.passo(p)
    r.resultado("media", "Média", "x̄", m, passo=n)
    r.resultado("desvio_padrao", "Desvio padrão (populacional)", "σ", sig, passo=n)
    r.resultado("soma_cubos", "Soma dos cubos", "Σ(xi − x̄)³", soma, passo=n)
    r.resultado("As", "Coeficiente do momento", "As", a, passo=n, classificacao=A.NOMES[c])
    r.resultado("classificacao", "Classificação", "", c, passo=n, exibicao=A.NOMES[c])
    return r.dict()


def coef_quartil(pedido: dict) -> dict:
    preparar(pedido)
    rol = sorted(ler_numeros(pedido["valores"]))
    if len(rol) < 2:
        raise ValueError("Digite pelo menos 2 valores.")
    q1, q2, q3, pq = P.quartis(rol)
    a, c, p = A.coef_quartil(q1, q2, q3)
    if rol == [1, 2, 2, 3, 4]:
        p.aviso_material = "⚠️ No material (apostila p.41, exemplo 4.3) aparece As = 1,5. O termo é 2·Me = 4: (1,5 + 3,5 − 4) ÷ 2 = 0,5. (E-02)"
    r = Resposta()
    n1, n2 = r.passo(pq), r.passo(p)
    r.resultado("mediana", "Mediana", "Me", q2, passo=n1)
    r.resultado("Q1", "1º quartil", "Q1", q1, passo=n1)
    r.resultado("Q3", "3º quartil", "Q3", q3, passo=n1)
    r.resultado("As", "Coeficiente quartil", "As", a, passo=n2, classificacao=A.NOMES[c])
    r.resultado("classificacao", "Classificação", "", c, passo=n2, exibicao=A.NOMES[c])
    return r.dict()
