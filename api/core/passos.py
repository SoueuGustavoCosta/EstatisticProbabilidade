"""Estruturas do contrato da API (docs/05): Passo, Resultado e Resposta."""
from dataclasses import asdict, dataclass, field
from fractions import Fraction

from .formatacao import exib


@dataclass
class Passo:
    titulo: str
    fonte: str
    formula_latex: str | None = None
    substituicao_latex: str | None = None
    linhas: list[str] = field(default_factory=list)
    tabela: dict | None = None
    resultado: str | None = None
    interpretacao: str | None = None
    dica: str | None = None
    aviso_material: str | None = None
    teclas_calculadora: list[str] = field(default_factory=list)
    n: int = 0


def tabela(colunas, linhas, rodape=None, destaque=None) -> dict:
    return {
        "colunas": list(colunas),
        "linhas": [[str(c) for c in l] for l in linhas],
        "rodape": None if rodape is None else [str(c) for c in rodape],
        "destaque_linhas": destaque or [],
    }


def _json(v):
    if isinstance(v, Fraction):
        return int(v) if v.denominator == 1 else float(v)
    if isinstance(v, (list, tuple)):
        return [_json(i) for i in v]
    return v


class Resposta:
    def __init__(self):
        self.resultados: list[dict] = []
        self.passos: list[Passo] = []
        self.grafico: dict | None = None
        self.avisos: list[str] = []

    def passo(self, p: Passo) -> int:
        p.n = len(self.passos) + 1
        self.passos.append(p)
        return p.n

    def resultado(self, id, nome, simbolo, valor, unidade=None, passo=None, exibicao=None, classificacao=None):
        if exibicao is None:
            if isinstance(valor, (list, tuple)):
                exibicao = "; ".join(exib(v) if isinstance(v, (int, float, Fraction)) else str(v) for v in valor) or "—"
            elif isinstance(valor, (int, float, Fraction)) and not isinstance(valor, bool):
                exibicao = exib(valor)
            else:
                exibicao = str(valor)
        r = {
            "id": id, "nome": nome, "simbolo": simbolo, "valor": _json(valor),
            "exibicao": exibicao, "unidade": unidade, "passo_ref": passo,
        }
        if classificacao:
            r["classificacao"] = classificacao
        self.resultados.append(r)

    def dict(self) -> dict:
        return {
            "resultados": self.resultados,
            "grafico": self.grafico,
            "passos": [asdict(p) for p in self.passos],
            "avisos": self.avisos,
        }
