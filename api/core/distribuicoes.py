"""Binomial e Normal (docs/02 §7; casos da Normal limitados pela decisão P-08)."""
import json
import math
import re
from decimal import ROUND_HALF_UP, Decimal
from fractions import Fraction
from pathlib import Path

from .dispersao import raiz
from .formatacao import F, d, fmt, frac_txt, ig, ltx
from .passos import Passo, tabela
from .teclas import teclas

_TABELA_Z = None


def tabela_z() -> dict:
    global _TABELA_Z
    if _TABELA_Z is None:
        _TABELA_Z = json.loads((Path(__file__).parents[2] / "data" / "tabela_z.json").read_text(encoding="utf-8"))["tabela"]
    return _TABELA_Z


# ---------- Binomial ----------

def _fatorial_txt(n: int) -> str:
    if n <= 1:
        return f"{n}! = 1"
    termos = [str(i) for i in range(n, 0, -1)]
    corpo = " × ".join(termos) if n <= 12 else " × ".join(termos[:4]) + " × … × 1"
    return f"{n}! = {corpo} = {math.factorial(n)}"


def ler_faixa(k, n):
    """k pode ser número ou faixa: '3', '>=3', '≥ 3', '<=2', '>3', '<3'. Devolve lista de k e descrição."""
    if isinstance(k, int) and not isinstance(k, bool):
        ks, desc = [k], f"k = {k}"
    else:
        s = str(k).replace(" ", "").replace("≥", ">=").replace("≤", "<=")
        m = re.fullmatch(r"(>=|<=|>|<|=)?(\d+)", s)
        if not m:
            raise ValueError("Use k como número (3) ou faixa (≥ 3, ≤ 2, > 1, < 4).")
        op, v = m.group(1) or "=", int(m.group(2))
        todos = range(0, n + 1)
        ks = [i for i in todos if {"=": i == v, ">=": i >= v, "<=": i <= v, ">": i > v, "<": i < v}[op]]
        desc = f"k {op.replace('>=', '≥').replace('<=', '≤')} {v}"
    if not ks or any(i < 0 or i > n for i in ks):
        raise ValueError(f"k precisa estar entre 0 e {n}.")
    return ks, desc


def binomial(n, p, k):
    """Devolve (P, q, média, variância, ks, Probabilidades por k, [Passo]) — tudo exato."""
    n = int(n)
    p = F(p)
    if n < 1:
        raise ValueError("n precisa ser pelo menos 1.")
    if not 0 <= p <= 1:
        raise ValueError("p precisa estar entre 0 e 1 (aceita fração, como 1/5).")
    ks, desc = ler_faixa(k, n)
    q = 1 - p
    f = "Apostila p.54–55 · Distribuição binomial"
    passos = [Passo("Probabilidade de fracasso", f, formula_latex=r"q=1-p", substituicao_latex=rf"q=1-{ltx(frac_txt(p))}",
                    linhas=[f"q = 1 − p = 1 − {frac_txt(p)} = {frac_txt(q)}"], resultado=f"q = {frac_txt(q)}",
                    teclas_calculadora=teclas(f"1−{fmt(p, 10)}"))]
    todas = {i: Fraction(math.comb(n, i)) * p ** i * q ** (n - i) for i in range(n + 1)}
    for i in ks:
        comb = math.comb(n, i)
        passos += [
            Passo(f"Combinação para k = {i}", f, formula_latex=r"\frac{n!}{k!\,(n-k)!}",
                  substituicao_latex=rf"\frac{{{n}!}}{{{i}!\,{n - i}!}}",
                  linhas=[_fatorial_txt(n), _fatorial_txt(i), _fatorial_txt(n - i),
                          f"{n}! ÷ ({i}! × {n - i}!) = {math.factorial(n)} ÷ ({math.factorial(i)} × {math.factorial(n - i)}) = {comb}"],
                  resultado=str(comb), dica="Importa só a quantidade de sucessos, não a ordem em que eles aparecem.",
                  teclas_calculadora=teclas(f"{n}x!÷({i}x!×{n - i}x!)")),
            Passo(f"Potências para k = {i}", f, formula_latex=r"p^{k}\cdot q^{\,n-k}",
                  linhas=[f"p^k = ({frac_txt(p)})^{i} = {frac_txt(p ** i)}", f"q^(n−k) = ({frac_txt(q)})^{n - i} = {frac_txt(q ** (n - i))}"],
                  resultado=f"{frac_txt(p ** i)} e {frac_txt(q ** (n - i))}",
                  teclas_calculadora=teclas(f"({fmt(p, 10)})^{i}")),
            Passo(f"P({i}) · produto final", f, formula_latex=r"P(k)=\frac{n!}{k!\,(n-k)!}\cdot p^{k}\cdot q^{\,n-k}",
                  linhas=[f"P({i}) = {comb} × {frac_txt(p ** i)} × {frac_txt(q ** (n - i))} = {frac_txt(todas[i])}", f"Em decimal: {ig(todas[i], 6)}; em porcentagem: {fmt(todas[i] * 100)}%"],
                  resultado=f"{frac_txt(todas[i])} {ig(todas[i], 4)}",
                  teclas_calculadora=teclas(f"{comb}×({fmt(p, 10)})^{i}×({fmt(q, 10)})^{n - i}")),
        ]
    P = sum(todas[i] for i in ks)
    if len(ks) > 1:
        passos.append(Passo(f"Soma das probabilidades ({desc})", f, linhas=[" + ".join(f"P({i})" for i in ks) + " = " + " + ".join(fmt(todas[i], 6) for i in ks) + f" = {fmt(P, 6)}"],
                            resultado=fmt(P, 6), teclas_calculadora=teclas("+".join(fmt(todas[i], 10) for i in ks))))
    media, var = n * p, n * p * q
    passos.append(Passo("Média e variância", f, formula_latex=r"\bar{x}=np \qquad \sigma^2=npq",
                        linhas=[f"Média: n × p = {n} × {frac_txt(p)} {ig(media)}", f"Variância: n × p × q = {n} × {frac_txt(p)} × {frac_txt(q)} {ig(var)}"],
                        resultado=f"média {fmt(media)} · variância {fmt(var)}", teclas_calculadora=teclas(f"{n}×{fmt(p, 10)}")))
    return P, q, media, var, ks, todas, desc, passos


# ---------- Normal ----------

def _chave(z: Fraction) -> str:
    """Z já arredondado em 2 casas -> '2.00'."""
    return format(Decimal(abs(z).numerator) / Decimal(abs(z).denominator), ".2f")


def z_arredondado(z) -> Fraction:
    return F((Decimal(z.numerator) / Decimal(z.denominator)).quantize(Decimal("0.01"), ROUND_HALF_UP))


def area(z: Fraction) -> Fraction:
    """P(0 ≤ Z ≤ |z|) pela Tabela 6 da apostila (p.56)."""
    chave = _chave(z)
    t = tabela_z()
    if chave not in t:
        raise ValueError(f"Z = {chave} está fora da tabela do material (vai de 0,00 a 3,09).")
    return F(t[chave])


def _linha_coluna(z):
    chave = _chave(z)
    return chave[:-1], chave[-1], chave


def normal(mu, a, b, sigma=None, variancia=None):
    """P(a ≤ X ≤ b) para X normal. Só os casos da apostila (P-08): [0,z], [−z,0] e intervalo que cruza a média.
    Devolve (z_a, z_b, P, [Passo], dados do gráfico)."""
    mu, a, b = F(mu), F(a), F(b)
    f = "Apostila p.54–57 · Distribuição normal"
    passos = []
    if sigma is None and variancia is None:
        raise ValueError("Informe σ (desvio padrão) ou σ² (variância).")
    if sigma is None:
        var = F(variancia)
        if var <= 0:
            raise ValueError("A variância precisa ser maior que zero.")
        sigma = raiz(var)
        passos.append(Passo("Desvio padrão a partir da variância", f, formula_latex=r"\sigma=\sqrt{\sigma^2}",
                            linhas=[f"σ = √{d(var)} {ig(sigma)}"], resultado=f"σ = {fmt(sigma)}", teclas_calculadora=teclas(f"√{d(var)}")))
    sigma = F(sigma)
    if sigma <= 0:
        raise ValueError("σ precisa ser maior que zero.")
    if a >= b:
        raise ValueError("O limite a precisa ser menor que o limite b.")
    za_ex, zb_ex = (a - mu) / sigma, (b - mu) / sigma
    za, zb = z_arredondado(za_ex), z_arredondado(zb_ex)
    for nome, lim, ze, zr in (("a", a, za_ex, za), ("b", b, zb_ex, zb)):
        passos.append(Passo(f"Padronização do limite {nome}", f, formula_latex=r"Z=\frac{X-\mu}{\sigma}",
                            substituicao_latex=rf"Z=\frac{{{ltx(d(lim))}-{ltx(d(mu))}}}{{{ltx(d(sigma))}}}",
                            linhas=[f"Z = ({d(lim)} − {d(mu)}) ÷ {d(sigma)} = {d(lim - mu)} ÷ {d(sigma)} {ig(ze, 4)}"]
                            + ([f"Para usar a tabela, arredondamos Z para 2 casas: {fmt(zr)}."] if ze != zr else []),
                            resultado=f"Z = {fmt(zr)}", teclas_calculadora=teclas(f"({d(lim)}−{d(mu)})÷{d(sigma)}")))
    if za < 0 < zb:
        caso = "cruza"
    elif za == 0 and zb > 0:
        caso = "0_z"
    elif zb == 0 and za < 0:
        caso = "z_0"
    else:
        raise ValueError("Este cálculo não está no material da disciplina: o material só traz P(0 ≤ Z ≤ z), P(−z ≤ Z ≤ 0) e intervalos que cruzam a média (pendência P-08).")
    partes = []
    for z in ((za,) if caso == "z_0" else (zb,) if caso == "0_z" else (za, zb)):
        linha, col, chave = _linha_coluna(z)
        ar = area(z)
        partes.append(ar)
        passos.append(Passo(f"Tabela Z para Z = {fmt(z)}", "Apostila p.56 · Tabela 6",
                            linhas=[f"Linha {linha.replace('.', ',')} (unidade e 1ª casa decimal), coluna {col} (2ª casa decimal)."]
                            + ([f"Z é negativo: pela simetria, P(−{fmt(abs(z))} ≤ Z ≤ 0) = P(0 ≤ Z ≤ {fmt(abs(z))})."] if z < 0 else [])
                            + [f"Valor da tabela: {fmt(ar, 4)}"],
                            tabela={"tipo": "tabela_z", "linha": linha, "coluna": col, "chave": chave, "valor": float(ar)},
                            resultado=fmt(ar, 4)))
    P = sum(partes)
    if caso == "cruza":
        linhas = [f"O intervalo cruza a média: somamos as duas áreas.", f"{fmt(partes[0], 4)} + {fmt(partes[1], 4)} = {fmt(P, 4)}"]
        tec = teclas(f"{fmt(partes[0], 4)}+{fmt(partes[1], 4)}")
    else:
        linhas = [f"A probabilidade é a área da tabela: {fmt(P, 4)}"]
        tec = []
    passos.append(Passo("Probabilidade final", f, linhas=linhas + [f"Em porcentagem: {fmt(P, 4)} × 100 = {fmt(P * 100)}%"],
                        resultado=f"{fmt(P, 4)} = {fmt(P * 100)}%", teclas_calculadora=tec,
                        interpretacao=f"A chance de X ficar entre {d(a)} e {d(b)} é de {fmt(P * 100)}%."))
    return za, zb, P, passos, {"mu": mu, "sigma": sigma, "a": a, "b": b}
