"""L2 tabela de frequência, L3 tabela com classes, L4 montar classes e moda qualitativa."""
from fractions import Fraction

from ..core import dispersao as D
from ..core import frequencia as Fq
from ..core import posicao as P
from ..core.entrada import ler_numeros
from ..core.formatacao import F, d, fmt, ig
from ..core.passos import Passo, Resposta, tabela
from . import preparar, tipo_dados


def _pares(pedido):
    pares = [(F(x), F(n)) for x, n in pedido.get("tabela", [])]
    if not pares or any(n <= 0 or n.denominator != 1 for _, n in pares):
        raise ValueError("Preencha a tabela com frequências inteiras maiores que zero.")
    return sorted(pares)


def tabela_frequencia(pedido: dict) -> dict:
    """L2 — valor xi + frequência ni."""
    preparar(pedido)
    pop = tipo_dados(pedido)
    pares = _pares(pedido)
    xs, ns = [x for x, _ in pares], [n for _, n in pares]
    N = sum(ns)
    if not pop and N < 2:
        raise ValueError("A amostra precisa de pelo menos 2 elementos.")
    u = pedido.get("unidade") or None
    r = Resposta()
    p_n = r.passo(Passo("Total de frequências", "Aula 05 · Tabela de frequência", linhas=["Σni = " + " + ".join(d(n) for n in ns) + f" = {d(N)}"],
                        tabela=tabela(["xi", "ni", "fi (%)"], [[d(x), d(n), fmt(n / N * 100) + "%"] for x, n in pares], ["Total", d(N), "100%"]),
                        resultado=f"n = {d(N)}"))
    r.resultado("n", "Total", "Σni", N, passo=p_n)
    m, pm = P.media(xs, ns, True, u)
    p_m = r.passo(pm)
    r.resultado("media", "Média ponderada", "x̄", m, u, p_m)
    rol = [x for x, n in pares for _ in range(int(n))]
    me, pme = P.mediana(rol, u)
    p_me = r.passo(pme)
    r.resultado("mediana", "Mediana", "Me", me, u, p_me)
    modas, classe, pmo = P.moda(pares)
    p_mo = r.passo(pmo)
    r.resultado("moda", "Moda", "Mo", modas, passo=p_mo, exibicao=", ".join(d(x) for x in modas) or "não há")
    r.resultado("classificacao", "Classificação da moda", "", classe, passo=p_mo, exibicao=classe)
    at, pat = D.amplitude(xs[0], xs[-1], u)
    r.resultado("amplitude_total", "Amplitude total", "AT", at, u, r.passo(pat))
    dm, sm, _, pdm = D.desvio_medio(xs, ns, m, True, u)
    r.resultado("desvio_medio", "Desvio médio", "dm", dm, u, r.passo(pdm))
    var, sq, pv = D.variancia(xs, ns, m, pop, True, u)
    p_v = r.passo(pv)
    r.resultado("variancia", "Variância", "σ²" if pop else "s²", var, (u + "²") if u else None, p_v)
    sd, psd = D.desvio_padrao(var, pop, u)
    r.resultado("desvio_padrao", "Desvio padrão", "σ" if pop else "s", sd, u, r.passo(psd))
    menos = pedido.get("menos_de")
    if menos is not None:
        lim = F(menos)
        qtd = sum(n for x, n in pares if x < lim)
        pc = qtd / N * 100
        pq = r.passo(Passo(f"Porcentagem com menos de {d(lim)}", "Aula 05 · Tabela de frequência",
                           linhas=["Somamos as frequências dos valores menores: " + (" + ".join(d(n) for x, n in pares if x < lim) or "0") + f" = {d(qtd)}", f"{d(qtd)} ÷ {d(N)} × 100 {ig(pc)}%"],
                           resultado=fmt(pc) + "%"))
        r.resultado("percentual_menos_de", f"% com menos de {d(lim)}", "", pc, passo=pq, exibicao=fmt(pc) + "%")
    r.grafico = {"tipo": "barras", "series": [{"x": float(x), "n": int(n)} for x, n in pares],
                 "marcadores": [{"nome": "Média", "x": float(m)}, {"nome": "Mediana", "x": float(me)}]}
    return r.dict()


def tabela_classes(pedido: dict) -> dict:
    """L3 — classes [limite inferior, limite superior, ni]. Valor representativo = ponto médio (P-01 e P-02)."""
    preparar(pedido)
    tem_tipo = pedido.get("tipo_dados") in ("populacao", "amostra")
    pop = tem_tipo and tipo_dados(pedido)
    intervalo = pedido.get("intervalo", "(a,b]")
    if intervalo not in ("(a,b]", "[a,b)", "[a,b]", "(a,b)"):
        raise ValueError("Tipo de intervalo inválido.")
    inteiros = pedido.get("dados_inteiros", True)
    linhas_cl = [(F(a), F(b), F(n)) for a, b, n in pedido.get("classes", [])]
    if not linhas_cl or any(b <= a or n <= 0 for a, b, n in linhas_cl):
        raise ValueError("Confira os limites das classes (o superior precisa ser maior que o inferior) e as frequências.")
    classes = [(a, b) for a, b, _ in linhas_cl]
    ns = [n for _, _, n in linhas_cl]
    N = sum(ns)
    u = pedido.get("unidade") or None
    r = Resposta()
    fi = [n / N * 100 for n in ns]
    p_f = r.passo(Passo("Frequência relativa", "Aula 04 · Distribuição de frequências", formula_latex=r"f_i\,(\%)=\frac{n_i}{n}\times 100",
                        linhas=[f"{Fq.texto_classe(a, b, intervalo)}: {d(n)} ÷ {d(N)} × 100 {ig(f)}%" for (a, b), n, f in zip(classes, ns, fi)],
                        tabela=tabela(["Classe", "ni", "fi (%)"], [[Fq.texto_classe(a, b, intervalo), d(n), fmt(f) + "%"] for (a, b), n, f in zip(classes, ns, fi)],
                                      ["Total", d(N), fmt(sum(fi)) + "%"]), resultado=", ".join(fmt(f) + "%" for f in fi)))
    r.resultado("fi_percent", "Frequências relativas", "fi", fi, passo=p_f, exibicao=", ".join(fmt(f) + "%" for f in fi))
    pms, ppm = Fq.pontos_medios(classes, intervalo, inteiros)
    p_pm = r.passo(ppm)
    r.resultado("pontos_medios", "Pontos médios", "xi", pms, passo=p_pm, exibicao=", ".join(d(x) for x in pms))
    m, pm = P.media(pms, ns, True, u)
    p_m = r.passo(pm)
    r.resultado("soma_xi_ni", "Σ xi·ni", "Σxi·ni", sum(x * n for x, n in zip(pms, ns)), passo=p_m)
    r.resultado("media_ponderada", "Média ponderada", "x̄", m, u, p_m)
    # P-09: FAA, mediana e moda por classes — fórmulas padrão de livro, fora do material; a confirmar com o professor.
    aviso_p09 = "Pendência P-09: o material não traz FAA, mediana nem moda com classes. Usamos as fórmulas padrão de livro (interpolação e Czuber); confirme com o professor."
    faa = [sum(ns[: i + 1]) for i in range(len(ns))]
    p_faa = r.passo(Passo("Frequência acumulada (FAA)", "Fórmula padrão de livro · P-09",
                          linhas=[f"{Fq.texto_classe(a, b, intervalo)}: " + " + ".join(d(n) for n in ns[: i + 1]) + f" = {d(c)}" for i, ((a, b), c) in enumerate(zip(classes, faa))],
                          tabela=tabela(["Classe", "ni", "FAA"], [[Fq.texto_classe(a, b, intervalo), d(n), d(c)] for (a, b), n, c in zip(classes, ns, faa)]),
                          aviso_material=aviso_p09, resultado=", ".join(d(c) for c in faa)))
    r.resultado("faa", "Frequência acumulada (FAA)", "FAA", faa, passo=p_faa, exibicao=", ".join(d(c) for c in faa))
    k = next(i for i, c in enumerate(faa) if c >= N / 2)
    a, b = classes[k]
    ant = faa[k - 1] if k else F(0)
    me = a + (N / 2 - ant) / ns[k] * (b - a)
    pme = r.passo(Passo("Mediana com classes", "Fórmula padrão de livro · P-09", formula_latex=r"Md=l_i+\frac{\frac{n}{2}-FAA_{ant}}{n_{md}}\times h",
                        linhas=[f"n ÷ 2 = {d(N)} ÷ 2 = {d(N / 2)}; a primeira FAA que chega lá é {d(faa[k])}, na classe {Fq.texto_classe(a, b, intervalo)}",
                                f"li = {d(a)}, FAA anterior = {d(ant)}, n da classe = {d(ns[k])}, h = {d(b - a)}",
                                f"Md = {d(a)} + ({d(N / 2)} − {d(ant)}) ÷ {d(ns[k])} × {d(b - a)} {ig(me)}"],
                        aviso_material=aviso_p09, resultado=fmt(me)))
    r.resultado("mediana_classes", "Mediana (classes)", "Md", me, u, pme)
    mx_i = max(range(len(ns)), key=lambda i: ns[i])
    d1 = ns[mx_i] - (ns[mx_i - 1] if mx_i else 0)
    d2 = ns[mx_i] - (ns[mx_i + 1] if mx_i < len(ns) - 1 else 0)
    a, b = classes[mx_i]
    mo = a + d1 / (d1 + d2) * (b - a)
    pmo = r.passo(Passo("Moda com classes (Czuber)", "Fórmula padrão de livro · P-09", formula_latex=r"Mo=l_i+\frac{d_1}{d_1+d_2}\times h",
                        linhas=[f"Classe modal (maior ni): {Fq.texto_classe(a, b, intervalo)} com {d(ns[mx_i])}",
                                f"d1 = ni − ni anterior = {d(d1)}; d2 = ni − ni seguinte = {d(d2)}",
                                f"Mo = {d(a)} + {d(d1)} ÷ ({d(d1)} + {d(d2)}) × {d(b - a)} {ig(mo)}"],
                        aviso_material=aviso_p09, resultado=fmt(mo)))
    r.resultado("moda_classes", "Moda (classes)", "Mo", mo, u, pmo)
    r.avisos.append(aviso_p09)
    xmin, xmax = classes[0][0], classes[-1][1]
    at, pat = D.amplitude(xmin, xmax, u)
    pat.linhas.append(f"Também vale: maior ponto médio − menor ponto médio = {d(pms[-1])} − {d(pms[0])} = {d(pms[-1] - pms[0])} (apostila p.32).")
    pat.titulo = "Amplitude total (limites das classes)"
    r.resultado("amplitude_total", "Amplitude total", "AT", at, u, r.passo(pat))
    aviso_p02 = "Pendência P-02: o material não resolve o desvio médio e a variância com classes. Usamos o ponto médio como valor representativo, como na média ponderada (aula 02)."
    dm, _, _, pdm = D.desvio_medio(pms, ns, m, True, u)
    pdm.aviso_material = aviso_p02
    r.resultado("desvio_medio", "Desvio médio", "dm", dm, u, r.passo(pdm))
    if tem_tipo:
        var, _, pv = D.variancia(pms, ns, m, pop, True, u)
        pv.aviso_material = aviso_p02
        r.resultado("variancia", "Variância", "σ²" if pop else "s²", var, (u + "²") if u else None, r.passo(pv))
        sd, psd = D.desvio_padrao(var, pop, u)
        r.resultado("desvio_padrao", "Desvio padrão", "σ" if pop else "s", sd, u, r.passo(psd))
    else:
        r.avisos.append("Escolha População ou Amostra para ver a variância e o desvio padrão.")
    r.avisos.append(aviso_p02)
    r.grafico = {"tipo": "histograma", "series": [{"classe": Fq.texto_classe(a, b, intervalo), "ni": int(n), "fi": float(f)} for (a, b), n, f in zip(classes, ns, fi)],
                 "marcadores": [{"nome": "Média", "x": float(m)}]}
    return r.dict()


def montar_classes(pedido: dict) -> dict:
    """L4 — monta a distribuição de frequências a partir dos dados (passos 01–06 do A4).
    K, h e inicio são sugeridos pelo app mas podem ser ajustados; `classes` fixa as classes (pula os passos 02–03)."""
    preparar(pedido)
    xs = ler_numeros(pedido.get("valores", []))
    if len(xs) < 2:
        raise ValueError("Digite pelo menos 2 valores.")
    if any(x.denominator != 1 for x in xs):
        raise ValueError("Este cálculo só está no material para dados inteiros.")
    intervalo = pedido.get("intervalo", "(a,b]")
    if intervalo not in ("(a,b]", "[a,b)", "[a,b]", "(a,b)"):
        raise ValueError("Tipo de intervalo inválido.")
    r = Resposta()
    if pedido.get("classes"):
        classes = [(F(a), F(b)) for a, b in pedido["classes"]]
        rol = sorted(xs)
        r.passo(Passo("Classes definidas por você", Fq.FONTE_CLASSES, linhas=["Rol: " + ", ".join(d(v) for v in rol), "Classes: " + "; ".join(Fq.texto_classe(a, b, intervalo) for a, b in classes)]))
        K, h = len(classes), classes[0][1] - classes[0][0]
    else:
        K, h, classes, ps = Fq.montar_classes(xs, pedido.get("K"), pedido.get("h"), pedido.get("inicio"), intervalo)
        for p in ps:
            r.passo(p)
        r.avisos.append("Pendência P-03: o material não define como arredondar K nem onde começa a 1ª classe. Ajuste K, h e o início se precisar.")
    ni, fi, ps2, avisos = Fq.tabela_com_classes(xs, classes, intervalo)
    p_cont = None
    for p in ps2:
        n = r.passo(p)
        p_cont = p_cont or n
    r.avisos += avisos
    r.resultado("K", "Número de classes", "K", K, passo=1)
    r.resultado("h", "Amplitude de classe", "h", h, passo=3)
    r.resultado("ni", "Frequências absolutas", "ni", ni, passo=p_cont, exibicao=", ".join(str(x) for x in ni))
    r.resultado("fi_percent", "Frequências relativas", "fi", fi, passo=p_cont + 1, exibicao=", ".join(fmt(f) + "%" for f in fi))
    r.grafico = {"tipo": "histograma", "series": [{"classe": Fq.texto_classe(a, b, intervalo), "ni": int(n), "fi": float(f)} for (a, b), n, f in zip(classes, ni, fi)], "marcadores": []}
    return r.dict()


def moda_qualitativa(pedido: dict) -> dict:
    """Moda de variável qualitativa (categorias e contagens)."""
    preparar(pedido)
    cat = {k: F(v) for k, v in pedido.get("categorias", {}).items()}
    if not cat:
        raise ValueError("Informe as categorias e quantas vezes cada uma aparece.")
    r = Resposta()
    nomes = list(cat)
    modas, classe, p = P.moda([(i, n) for i, n in enumerate(cat.values())])
    p.tabela = tabela(["Categoria", "Repetições"], [[k, d(v)] for k, v in cat.items()], destaque=[nomes.index(nomes[int(i)]) for i in modas])
    p.linhas[-1] = p.linhas[-1] if classe == "amodal" else f"Moda = {'; '.join(nomes[int(i)] for i in modas)} ({classe})."
    p.resultado = "amodal (não há moda)" if classe == "amodal" else "; ".join(nomes[int(i)] for i in modas)
    n = r.passo(p)
    r.resultado("moda", "Moda", "Mo", [nomes[int(i)] for i in modas], passo=n, exibicao=p.resultado)
    r.resultado("classificacao", "Classificação", "", classe, passo=n, exibicao=classe)
    r.grafico = {"tipo": "barras", "series": [{"x": k, "n": int(v)} for k, v in cat.items()], "marcadores": []}
    return r.dict()
