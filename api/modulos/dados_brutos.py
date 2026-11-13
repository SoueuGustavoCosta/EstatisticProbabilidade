"""L1 — Dados brutos (docs/05). O módulo principal: resultados, gráfico e 15+ passos."""
from ..core import assimetria as A
from ..core import dispersao as D
from ..core import frequencia as Fq
from ..core import posicao as P
from ..core.entrada import ler_numeros
from ..core.formatacao import d, fmt, ig, ltx
from ..core.passos import Passo, Resposta, tabela
from ..core.teclas import teclas
from . import preparar, tipo_dados

ROL_20_NOTAS = sorted([84, 67, 80, 33, 78, 96, 49, 74, 65, 41, 81, 66, 50, 91, 59, 71, 94, 41, 52, 56])
NOMES_CLASSE = A.NOMES


def calcular(pedido: dict) -> dict:
    preparar(pedido)
    pop = tipo_dados(pedido)
    xs = ler_numeros(pedido.get("valores", []))
    n = len(xs)
    if n == 0 or (not pop and n < 2):
        raise ValueError("Digite pelo menos 2 valores." if not pop else "Digite pelo menos 1 valor.")
    u = pedido.get("unidade") or None
    r = Resposta()
    rol = sorted(xs)

    def res(id, nome, simbolo, valor, passo, **kw):
        r.resultado(id, nome, simbolo, valor, unidade=kw.pop("unidade", u), passo=passo, **kw)

    # 1 e 2 — dados brutos e rol
    r.passo(Passo("Dados brutos", "Aula 01 · Dados brutos / Apostila p.12",
                  linhas=["Estes são os dados do jeito que foram digitados, sem organização:", ", ".join(d(x) for x in xs)],
                  resultado=f"{n} valores"))
    ja_ordenado = xs == rol
    p_rol = r.passo(Passo("Rol (dados em ordem crescente)", "Aula 01 · Rol / Apostila p.12",
                          linhas=["Ordenamos do menor para o maior. Isso é o rol.", "Antes: " + ", ".join(d(x) for x in xs), "Depois: " + ", ".join(d(x) for x in rol)]
                          + (["Os dados já estavam em ordem."] if ja_ordenado else []),
                          tabela=tabela(["Dados brutos", "Rol"], [[d(a), d(b)] for a, b in zip(xs, rol)]),
                          resultado=", ".join(d(x) for x in rol)))
    res("rol", "Rol", "", rol, p_rol, exibicao=", ".join(d(x) for x in rol))

    # 3 — n
    p_n = r.passo(Passo("Quantidade de valores (n)", "Aula 02 · Média aritmética simples",
                        linhas=(["Numeramos os valores: " + ", ".join(f"x{i + 1} = {d(x)}" for i, x in enumerate(rol))] if n <= 30 else []) + [f"Contando, temos n = {n}."],
                        resultado=f"n = {n}"))
    res("n", "Quantidade", "n", n, p_n, exibicao=str(n))

    # 4 — soma, 5 — média
    S, ps = P.soma(xs)  # na ordem digitada, como no docs/05
    p_s = r.passo(ps)
    res("soma", "Soma", "Σx", S, p_s)
    m, pm = P.media(rol, [1] * n, False, u)
    p_m = r.passo(pm)
    res("media", "Média", "x̄", m, p_m)
    r.resultado("minimo", "Menor valor", "mín", rol[0], u, p_rol)
    r.resultado("maximo", "Maior valor", "máx", rol[-1], u, p_rol)

    # 6 — mediana, 7 — moda
    me, pme = P.mediana(rol, u)
    p_me = r.passo(pme)
    res("mediana", "Mediana", "Me", me, p_me)
    modas, classe_moda, pmo = P.moda(P.contar(rol))
    p_mo = r.passo(pmo)
    res("moda", "Moda", "Mo", modas, p_mo, exibicao=", ".join(d(x) for x in modas) or "não há")
    res("classificacao", "Classificação da moda", "", classe_moda, p_mo, exibicao=classe_moda, unidade=None)

    # 8 — amplitude total
    at, pat = D.amplitude(rol[0], rol[-1], u)
    p_at = r.passo(pat)
    res("amplitude_total", "Amplitude total", "AT", at, p_at)

    # 9 — desvio médio
    dm, soma_mod, soma_sem, pdm = D.desvio_medio(rol, [1] * n, m, False, u)
    if rol == ROL_20_NOTAS:
        pdm.aviso_material = "⚠️ O material (apostila p.33, exemplo 3.2) diz que vai calcular o desvio médio, mas mostra as frequências relativas e não traz o resultado. Aplicando a fórmula: 304 ÷ 20 = 15,2. (E-06)"
    p_dm = r.passo(pdm)
    res("desvio_medio", "Desvio médio", "dm", dm, p_dm)
    res("soma_sem_modulo", "Soma das diferenças (sem módulo)", "Σ(xi − x̄)", soma_sem, p_dm)
    res("soma_modulos", "Soma dos módulos", "Σ|xi − x̄|", soma_mod, p_dm)

    # 10 — variância, 11 — desvio padrão
    var, sq, pv = D.variancia(rol, [1] * n, m, pop, False, u)
    p_v = r.passo(pv)
    res("soma_quadrados", "Soma dos quadrados", "Σ(xi − x̄)²", sq, p_v)
    res("variancia", "Variância", "σ²" if pop else "s²", var, p_v, unidade=(u + "²") if u else None)
    sd, psd = D.desvio_padrao(var, pop, u)
    psd.linhas.append(f"Intervalo média ± desvio: [{fmt(m)} − {fmt(sd)} ; {fmt(m)} + {fmt(sd)}] = [{fmt(m - sd)} ; {fmt(m + sd)}]")
    psd.dica = "Isso não significa que média ± desvio dá a maior e a menor nota: é onde os dados se concentram."
    p_sd = r.passo(psd)
    res("desvio_padrao", "Desvio padrão", "σ" if pop else "s", sd, p_sd)
    res("intervalo_media_dp", "Intervalo média ± desvio", "[x̄ − s ; x̄ + s]", [m - sd, m + sd], p_sd,
        exibicao=f"[{fmt(m - sd)} ; {fmt(m + sd)}]")

    # 12 — quartis
    q1, q2, q3, pq = P.quartis(rol)
    p_q = r.passo(pq)
    res("Q1", "1º quartil", "Q1", q1, p_q)
    res("Q2", "2º quartil", "Q2", q2, p_q)
    res("Q3", "3º quartil", "Q3", q3, p_q)

    # 13 — assimetria (σ populacional sempre — D-03)
    sig, var_pop = A.sigma_pop(rol, m)
    if not pop:
        r.passo(Passo("Desvio padrão populacional (para a assimetria)", "Apostila p.40 · Coeficientes de assimetria",
                      linhas=["Os coeficientes usam o σ populacional, mesmo com dados de amostra.", f"σ² = {fmt(sq)} ÷ {n} {ig(var_pop)}", f"σ = √{fmt(var_pop)} {ig(sig)}"],
                      resultado=f"σ = {fmt(sig)}", teclas_calculadora=teclas(f"√({fmt(sq, 10)}÷{n})")))
    mo_unica = modas[0] if len(modas) == 1 else None
    a1, c1, pa1 = A.pearson1(m, mo_unica, sig)
    a2, c2, pa2 = A.pearson2(m, me, sig)
    am, cm, soma_cubos, pam = A.momento(rol, m, sig)
    aq, cq, paq = A.coef_quartil(q1, q2, q3)
    if sorted(rol) == [2, 2, 3, 4, 5, 5, 14]:
        aviso = "⚠️ No gabarito da Unidade 4 (Q7 e Q8) as respostas do momento (0,78) e do 2º Pearson (1,67) estão trocadas. Refazendo: momento ≅ 1,66 e 2º Pearson ≅ 0,78. (E-04)"
        pam.aviso_material = pa2.aviso_material = aviso
    if rol == [2, 3, 4]:
        pam.aviso_material = "⚠️ No material (apostila p.40, exemplo 4.2) aparece As ≅ 1,21. Refazendo: (−1)³ + 0³ + 1³ = 0, então As = 0 (simétrica). (E-01)"
    if rol == [1, 2, 2, 3, 4]:
        paq.aviso_material = "⚠️ No material (apostila p.41, exemplo 4.3) aparece As = 1,5. O termo é 2·Me = 4: (1,5 + 3,5 − 4) ÷ 2 = 0,5. (E-02)"
    for chave, nome, sim, a, c, pas in (("as_pearson1", "1º Pearson", "As", a1, c1, pa1), ("as_pearson2", "2º Pearson", "As", a2, c2, pa2),
                                        ("as_momento", "Momento de assimetria", "As", am, cm, pam), ("as_quartil", "Coeficiente quartil", "As", aq, cq, paq)):
        num = r.passo(pas)
        if a is None:
            res(chave, nome, sim, "não se aplica", num, exibicao="não se aplica", unidade=None)
        else:
            res(chave, nome, sim, a, num, unidade=None, classificacao=NOMES_CLASSE[c])
    res("soma_cubos", "Soma dos cubos dos desvios", "Σ(xi − x̄)³", soma_cubos, p_m, unidade=None)

    # 14 — tabela de frequência sem classes
    pares, pf = Fq.tabela_sem_classes(rol)
    r.passo(pf)

    # 15+ — tabela com classes (A4), só para dados inteiros: o material não traz exemplo com decimais
    inteiros = all(x.denominator == 1 for x in rol)
    classes = None
    if inteiros and at > 0:
        K, h, classes, ps_cl = Fq.montar_classes(rol)
        for q in ps_cl:
            r.passo(q)
        ni, fi, ps_f, avisos = Fq.tabela_com_classes(rol, classes, "(a,b]")
        for q in ps_f:
            r.passo(q)
        r.avisos += avisos + ["Pendência P-03: o material não define como arredondar K nem onde começa a 1ª classe. Use o módulo “Montar distribuição” para ajustar."]
    else:
        r.avisos.append("A tabela com classes só é montada para dados inteiros: o material não traz exemplo com decimais.")

    r.grafico = {
        "tipo": "barras",
        "series": [{"x": float(v), "n": int(c)} for v, c in pares],
        "marcadores": [{"nome": "Média", "x": float(m)}, {"nome": "Mediana", "x": float(me)}] + [{"nome": "Moda", "x": float(x)} for x in modas],
        "histograma": None if classes is None else [
            {"classe": Fq.texto_classe(a, b, "(a,b]"), "ni": int(c), "fi": float(f)} for (a, b), c, f in zip(classes, ni, fi)
        ],
    }
    return r.dict()
