"""Tabelas de frequência, classes e ponto médio (docs/02 §2.1, decisões P-01 e P-03 do docs/08)."""
import math
from fractions import Fraction

from .formatacao import F, d, fmt, ig, ltx
from .passos import Passo, tabela
from .posicao import contar
from .teclas import teclas

FONTE_CLASSES = "Aula 04 · Distribuição de frequências / Apostila p.13"


def tabela_sem_classes(xs):
    """Passo: xi | ni | fi%."""
    pares = contar(xs)
    N = len(xs)
    linhas, tl = [], []
    for v, n in pares:
        fi = F(n) / N * 100
        linhas.append(f"{d(v)}: {n} ÷ {N} × 100 {ig(fi)}%")
        tl.append([d(v), n, fmt(fi) + "%"])
    return pares, Passo(
        "Tabela de frequência (sem classes)", FONTE_CLASSES,
        formula_latex=r"f_i\,(\%)=\frac{n_i}{n}\times 100",
        linhas=["Contamos quantas vezes cada valor aparece (ni) e dividimos pelo total."] + linhas,
        tabela=tabela(["xi", "ni", "fi (%)"], tl, ["Total", N, "100%"]),
        resultado=f"{len(pares)} valores diferentes",
    )


def limites(a, b, intervalo):
    """Primeiro e último inteiro que pertencem à classe (decisão P-01: ( ) não conta, [ ] conta)."""
    i = a + 1 if intervalo[0] == "(" else a
    f = b - 1 if intervalo[-1] == ")" else b
    return i, f


def pertence(x, a, b, intervalo):
    return (a < x if intervalo[0] == "(" else a <= x) and (x < b if intervalo[-1] == ")" else x <= b)


def texto_classe(a, b, intervalo):
    return f"{intervalo[0]}{d(a)}, {d(b)}{intervalo[-1]}"


def ponto_medio(a, b, intervalo, inteiros=True):
    """Regra do material (P-01): (primeiro valor da classe + último valor da classe) ÷ 2."""
    if not inteiros:
        return (a + b) / 2, f"({d(a)} + {d(b)}) ÷ 2"
    i, f = limites(a, b, intervalo)
    return (i + f) / 2, f"({d(i)} + {d(f)}) ÷ 2"


def pontos_medios(classes, intervalo, inteiros=True):
    pms = [ponto_medio(a, b, intervalo, inteiros) for a, b in classes]
    linhas = []
    for (a, b), (pm, conta) in zip(classes, pms):
        linhas.append(f"{texto_classe(a, b, intervalo)}: {conta} = {d(pm)}")
    aviso = None
    if inteiros:
        aviso = ("Parêntese = limite fora da classe; colchete = limite dentro. Por isso o ponto médio de (32, 48] usa 33 e não 32: "
                 "(33 + 48) ÷ 2 = 40,5, como no material.") if intervalo[0] == "(" or intervalo[-1] == ")" else None
    p = Passo("Ponto médio de cada classe", "Aula 02 · Média ponderada com classes / Apostila p.25",
              linhas=["Com classes não sabemos os valores exatos, então cada classe é representada pelo ponto médio."] + linhas,
              dica=aviso, resultado=", ".join(d(pm) for pm, _ in pms))
    if not inteiros:
        p.aviso_material = "Pendência P-01: o material só mostra ponto médio para dados inteiros. Para dados com decimais usamos (limite inferior + limite superior) ÷ 2."
    return [pm for pm, _ in pms], p


def contar_classes(xs, classes, intervalo):
    """ni de cada classe; devolve também os valores que ficaram de fora."""
    ni = [sum(1 for x in xs if pertence(x, a, b, intervalo)) for a, b in classes]
    fora = [x for x in xs if not any(pertence(x, a, b, intervalo) for a, b in classes)]
    return ni, fora


def tabela_com_classes(xs, classes, intervalo):
    """Passos 04 a 06 do A4 sobre classes já definidas. Devolve (ni, fi, [Passo], avisos)."""
    N = len(xs)
    ni, fora = contar_classes(xs, classes, intervalo)
    avisos = []
    if fora:
        avisos.append("Estes valores ficaram fora das classes: " + ", ".join(d(v) for v in fora) + ". Ajuste os limites.")
    fi = [F(n) / N * 100 for n in ni]
    rol = sorted(xs)
    p4 = Passo(
        "Passo 04 · Contar os valores de cada classe", FONTE_CLASSES,
        linhas=[f"{texto_classe(a, b, intervalo)}: " + (", ".join(d(v) for v in rol if pertence(v, a, b, intervalo)) or "nenhum valor") + f" → ni = {n}"
                for (a, b), n in zip(classes, ni)],
        tabela=tabela(["Classe", "Valores", "ni"],
                      [[texto_classe(a, b, intervalo), ", ".join(d(v) for v in rol if pertence(v, a, b, intervalo)), n] for (a, b), n in zip(classes, ni)],
                      ["Total", "", sum(ni)]),
        dica="Cada valor entra em uma única classe: o limite com colchete pertence à classe, o limite com parêntese não.",
        resultado="ni = " + ", ".join(str(n) for n in ni),
    )
    p5 = Passo(
        "Passo 05 · Frequência relativa", FONTE_CLASSES, formula_latex=r"f_i\,(\%)=\frac{n_i}{n}\times 100",
        linhas=[f"{texto_classe(a, b, intervalo)}: {n} ÷ {N} × 100 {ig(f)}%" for (a, b), n, f in zip(classes, ni, fi)],
        tabela=tabela(["Classe", "ni", "Cálculo", "fi (%)"],
                      [[texto_classe(a, b, intervalo), n, f"{n} ÷ {N} × 100", fmt(f) + "%"] for (a, b), n, f in zip(classes, ni, fi)],
                      ["Total", sum(ni), "", fmt(sum(fi)) + "%"]),
        resultado="fi = " + ", ".join(fmt(f) + "%" for f in fi),
        teclas_calculadora=teclas(f"{ni[0]}÷{N}×100") if ni else [],
    )
    ok_n, ok_f = sum(ni) == N, sum(fi) == 100
    maior = max(range(len(ni)), key=lambda i: ni[i])
    p6 = Passo(
        "Passo 06 · Interpretar", FONTE_CLASSES,
        linhas=[f"Conferência: soma de ni = {sum(ni)} {'= ' + str(N) + ' ✓' if ok_n else '≠ ' + str(N) + ' ✗'}",
                f"Conferência: soma de fi = {fmt(sum(fi))}% {'✓' if ok_f else '✗'}",
                f"Maior concentração: {texto_classe(*classes[maior], intervalo)} com {fmt(fi[maior])}% dos dados."],
        resultado=f"Maior concentração em {texto_classe(*classes[maior], intervalo)} ({fmt(fi[maior])}%)",
    )
    return ni, fi, [p4, p5, p6], avisos


def montar_classes(xs, K=None, h=None, inicio=None, intervalo="(a,b]"):
    """Passos 01–03 do A4: define K, h e as classes. K, h e início podem ser ajustados (P-03).
    Só para dados inteiros — o material não traz exemplo com decimais."""
    rol = sorted(xs)
    N, mn, mx = len(rol), rol[0], rol[-1]
    AT = mx - mn
    p1 = Passo("Passo 01 · Rol, menor e maior valor", FONTE_CLASSES,
               linhas=["Rol: " + ", ".join(d(v) for v in rol), f"Menor valor: {d(mn)} · Maior valor: {d(mx)} · Quantidade de dados: {N}",
                       f"Amplitude total: {d(mx)} − {d(mn)} = {d(AT)}"], resultado=f"menor {d(mn)} · maior {d(mx)} · N = {N}")
    raiz_n = math.sqrt(N)
    k_sug = max(1, round(raiz_n))
    K = int(K) if K else k_sug
    p2 = Passo("Passo 02 · Número de classes", FONTE_CLASSES, formula_latex=r"K \cong \sqrt{N}",
               substituicao_latex=rf"K\cong\sqrt{{{N}}}\cong {ltx(fmt(raiz_n))}",
               linhas=[f"K é a quantidade de classes; ≅ quer dizer aproximadamente igual; N = {N} é o total de dados.",
                       f"√{N} ≅ {fmt(raiz_n)} → usamos K = {K}."],
               dica="O material não diz como arredondar o K (P-03). Aqui sugerimos o inteiro mais próximo; você pode ajustar.",
               resultado=f"K = {K}", teclas_calculadora=teclas(f"√{N}"))
    ini_sug = mn - 1 if intervalo[0] == "(" else mn
    inicio = F(inicio) if inicio is not None else ini_sug
    if h is None:
        h = F(math.ceil(F(AT) / K)) if AT else F(1)
        fim_ok = inicio + K * h
        cobre = fim_ok >= mx if intervalo[-1] == "]" else fim_ok > mx
        if not cobre:  # leitura da apostila: contar os inteiros de mn a mx (AT + 1) e dividir por K
            h = F(math.ceil((mx - inicio) / K))
    h = F(h)
    classes = [(inicio + i * h, inicio + (i + 1) * h) for i in range(K)]
    linhas3 = [f"h é a amplitude de classe; AT = {d(AT)} e K = {K}.",
               f"{d(AT)} ÷ {K} {ig(F(AT) / K)} → como deu número quebrado, arredondamos para cima: h = {d(h)}." if (F(AT) / K).denominator != 1 else f"{d(AT)} ÷ {K} = {d(h)}.",
               f"A primeira classe começa em {d(inicio)}: {'o parêntese deixa o ' + d(inicio) + ' de fora, então o menor valor (' + d(mn) + ') entra.' if intervalo[0] == '(' else 'o menor valor entra.'}",
               "Classes: " + "; ".join(texto_classe(a, b, intervalo) for a, b in classes)]
    if intervalo[0] == "(" and F(AT + 1) / K == h:
        linhas3.append(f"A apostila chega no mesmo h contando os inteiros de {d(mn)} até {d(mx)}: são {d(AT + 1)} números; {d(AT + 1)} ÷ {K} = {d(h)}.")
    p3 = Passo("Passo 03 · Amplitude de classe", FONTE_CLASSES, formula_latex=r"h \cong \frac{AT}{K}",
               substituicao_latex=rf"h\cong\frac{{{ltx(d(AT))}}}{{{K}}}", linhas=linhas3,
               dica="Se a divisão der número quebrado, arredonda-se para cima para o maior valor caber na última classe.",
               resultado=f"h = {d(h)}", teclas_calculadora=teclas(f"{d(AT)}÷{K}"))
    return K, h, classes, [p1, p2, p3]
