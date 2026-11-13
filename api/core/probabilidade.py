"""Probabilidade clássica, condicional, independência e Bayes (docs/02 §6)."""
from fractions import Fraction

from .formatacao import F, d, fmt, frac_txt, ig, ltx
from .passos import Passo, tabela
from .teclas import teclas

FONTE = "Apostila p.45–49 · Probabilidade"


def produto(texto) -> Fraction:
    """'1/10*4/9' -> Fraction. Aceita número, fração ou produto de frações."""
    if isinstance(texto, str) and "*" in texto:
        r = Fraction(1)
        for parte in texto.split("*"):
            r *= F(parte)
        return r
    return F(texto)


def _todas(p: Fraction) -> str:
    return f"{frac_txt(p)} = {fmt(p, 6)} = {fmt(p * 100)}%"


def verifica(p, nome):
    if not 0 <= p <= 1:
        raise ValueError(f"{nome} precisa estar entre 0 e 1.")


def classica(favoraveis, total):
    """Uma probabilidade por valor de `favoraveis`. Devolve ([Fraction], [Passo])."""
    total = int(total)
    lista = favoraveis if isinstance(favoraveis, (list, tuple)) else [favoraveis]
    if total <= 0:
        raise ValueError("O número de casos totais precisa ser maior que zero.")
    ps, passos = [], []
    for i, fav in enumerate(lista):
        fav = int(fav)
        if not 0 <= fav <= total:
            raise ValueError("Casos favoráveis não podem ser maiores que os casos totais.")
        p = Fraction(fav, total)
        ps.append(p)
        passos.append(Passo(
            "Probabilidade clássica" + (f" · evento {i + 1}" if len(lista) > 1 else ""), FONTE,
            formula_latex=r"P(A)=\frac{\text{casos favoráveis}}{\text{casos totais}}",
            substituicao_latex=rf"P(A)=\frac{{{fav}}}{{{total}}}",
            linhas=[f"Casos favoráveis: {fav}. Casos totais: {total}.", f"{fav} ÷ {total} = {fmt(p, 6)}", f"Em fração simplificada: {frac_txt(p)}.",
                    f"Em porcentagem: {fmt(p * 100)}%."],
            resultado=_todas(p), interpretacao=f"Em {total} casos possíveis, {fav} favorecem o evento.",
            dica="Importa a quantidade de elementos, não os valores.", teclas_calculadora=teclas(f"{fav}÷{total}")))
    return ps, passos


def condicional(p_inter, p_b):
    p_inter, p_b = produto(p_inter), produto(p_b)
    if p_b <= 0:
        raise ValueError("P(B) precisa ser maior que zero.")
    verifica(p_inter, "P(A ∩ B)"); verifica(p_b, "P(B)")
    r = p_inter / p_b
    return r, Passo(
        "Probabilidade condicional", "Apostila p.46 · Probabilidade condicional",
        formula_latex=r"P(A|B)=\frac{P(A\cap B)}{P(B)}", substituicao_latex=rf"P(A|B)=\frac{{{frac_txt(p_inter)}}}{{{frac_txt(p_b)}}}",
        linhas=[f"P(A ∩ B) = {frac_txt(p_inter)} ({fmt(p_inter, 6)}) e P(B) = {frac_txt(p_b)} ({fmt(p_b, 6)}).",
                f"P(A|B) = {frac_txt(p_inter)} ÷ {frac_txt(p_b)} = {frac_txt(r)}", f"Em decimal: {fmt(r, 6)}; em porcentagem: {fmt(r * 100)}%."],
        resultado=_todas(r), interpretacao="Lê-se “A dado B”: a chance de A acontecer sabendo que B aconteceu.",
        teclas_calculadora=teclas(f"{fmt(p_inter, 10)}÷{fmt(p_b, 10)}"))


def independencia(pa, pb, pab):
    pa, pb, pab = produto(pa), produto(pb), produto(pab)
    for v, n in ((pa, "P(A)"), (pb, "P(B)"), (pab, "P(A ∩ B)")):
        verifica(v, n)
    prod = pa * pb
    indep = prod == pab
    return indep, Passo(
        "Independência", "Apostila p.47 · Independência",
        formula_latex=r"P(A\cap B)=P(A)\cdot P(B)",
        linhas=[f"P(A) × P(B) = {frac_txt(pa)} × {frac_txt(pb)} = {frac_txt(prod)}", f"P(A ∩ B) = {frac_txt(pab)}",
                f"{frac_txt(prod)} {'=' if indep else '≠'} {frac_txt(pab)}"],
        resultado="independentes" if indep else "não são independentes",
        interpretacao="Os eventos são independentes: saber de um não muda a chance do outro." if indep else "Os eventos não são independentes.",
        teclas_calculadora=teclas(f"{fmt(pa, 10)}×{fmt(pb, 10)}"))


def bayes(eventos: dict, alvo: str, evento="E"):
    """eventos = {nome: (P(Bi), P(E|Bi))}. Devolve ({nome: posteriori}, numeradores, denominador, [Passo])."""
    if alvo not in eventos:
        raise ValueError(f"O evento “{alvo}” não está na lista.")
    pb = {k: F(v[0]) for k, v in eventos.items()}
    pe = {k: F(v[1]) for k, v in eventos.items()}
    if sum(pb.values()) != 1:
        raise ValueError(f"As probabilidades P(Bi) precisam somar 1 (agora somam {fmt(sum(pb.values()))}).")
    for k in eventos:
        verifica(pb[k], f"P({k})"); verifica(pe[k], f"P({evento}|{k})")
    num = {k: pe[k] * pb[k] for k in eventos}
    den = sum(num.values())
    if den == 0:
        raise ValueError("A probabilidade total do evento é zero; não dá para aplicar Bayes.")
    post = {k: num[k] / den for k in eventos}
    p1 = Passo(
        "Numerador de cada caminho", "Apostila p.48 · Teorema de Bayes",
        linhas=[f"P({evento}|{k}) × P({k}) = {fmt(pe[k], 6)} × {fmt(pb[k], 6)} = {fmt(num[k], 6)}" for k in eventos],
        tabela=tabela(["Evento", f"P(Bi)", f"P({evento}|Bi)", "Produto"], [[k, fmt(pb[k], 6), fmt(pe[k], 6), fmt(num[k], 6)] for k in eventos]),
        resultado=", ".join(f"{k}: {fmt(num[k], 6)}" for k in eventos),
        teclas_calculadora=teclas(f"{fmt(pe[alvo], 10)}×{fmt(pb[alvo], 10)}"))
    p2 = Passo("Denominador: probabilidade total", "Apostila p.48 · Teorema de Bayes",
               linhas=["Somamos os produtos de todos os caminhos: " + " + ".join(fmt(num[k], 6) for k in eventos) + f" = {fmt(den, 6)}"],
               resultado=fmt(den, 6), teclas_calculadora=teclas("+".join(fmt(v, 10) for v in num.values())))
    p3 = Passo("Teorema de Bayes", "Apostila p.48 · Teorema de Bayes",
               formula_latex=r"P(B_i|A)=\frac{P(A|B_i)\,P(B_i)}{\sum_{k=1}^{n}P(A|B_k)P(B_k)}",
               substituicao_latex=rf"P({alvo}|{evento})=\frac{{{ltx(fmt(num[alvo], 6))}}}{{{ltx(fmt(den, 6))}}}",
               linhas=[f"P({alvo}|{evento}) = {fmt(num[alvo], 6)} ÷ {fmt(den, 6)} {ig(post[alvo], 4)}"] +
                      [f"P({k}|{evento}) = {fmt(num[k], 6)} ÷ {fmt(den, 6)} {ig(post[k], 4)}" for k in eventos if k != alvo],
               resultado=f"≅ {fmt(post[alvo] * 100)}%" if not post[alvo].denominator == 1 else f"{fmt(post[alvo] * 100)}%",
               interpretacao=f"Sabendo que {evento} aconteceu, a chance de ter vindo de {alvo} é de {fmt(post[alvo] * 100)}%.",
               teclas_calculadora=teclas(f"{fmt(num[alvo], 10)}÷{fmt(den, 10)}"))
    return post, num, den, [p1, p2, p3]
