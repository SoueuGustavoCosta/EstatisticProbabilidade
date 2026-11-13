"""Formatação: vírgula decimal, "≅" quando arredonda, frações.

Tudo é calculado com Fraction (exato). Só arredondamos na hora de exibir (docs/05).
"""
from contextvars import ContextVar
from decimal import ROUND_HALF_UP, Decimal, localcontext
from fractions import Fraction

CASAS = ContextVar("casas", default=2)


def F(x) -> Fraction:
    """Converte número, texto ("1/5", "56,75") ou float para Fraction exata."""
    if isinstance(x, Fraction):
        return x
    if isinstance(x, bool):
        raise TypeError("booleano não é número")
    if isinstance(x, int):
        return Fraction(x)
    if isinstance(x, float):
        return Fraction(repr(x))
    if isinstance(x, Decimal):
        return Fraction(x)
    if isinstance(x, str):
        return Fraction(x.strip().replace(",", ".").replace("−", "-"))
    raise TypeError(f"valor não numérico: {x!r}")


def arredonda(x, casas: int | None = None) -> Decimal:
    casas = CASAS.get() if casas is None else casas
    x = F(x)
    with localcontext() as c:
        c.prec = 60
        return (Decimal(x.numerator) / Decimal(x.denominator)).quantize(Decimal(1).scaleb(-casas), ROUND_HALF_UP)


def fmt(x, casas: int | None = None) -> str:
    """66.4 -> '66,4'; 8 -> '8'; -5 -> '−5'. Arredonda em `casas` (padrão: pedido do usuário)."""
    s = format(arredonda(x, casas), "f")
    if "." in s:
        s = s.rstrip("0").rstrip(".")
    if s in ("-0", ""):
        s = "0"
    return s.replace(".", ",").replace("-", "−")


def d(x) -> str:
    """Dado ou valor exato (soma de decimais): mostra todas as casas, sem arredondar."""
    return fmt(x, 12)


def exato(x, casas: int | None = None) -> bool:
    return F(arredonda(x, casas)) == F(x)


def ig(x, casas: int | None = None) -> str:
    """'= 66,4' ou '≅ 68,41'."""
    return ("= " if exato(x, casas) else "≅ ") + fmt(x, casas)


def exib(x, casas: int | None = None) -> str:
    """Texto do card de resultado: '66,4' ou '≅ 68,41'."""
    return fmt(x, casas) if exato(x, casas) else "≅ " + fmt(x, casas)


def ltx(texto: str) -> str:
    """Vírgula decimal em LaTeX: '66,4' -> '66{,}4'."""
    return texto.replace(",", "{,}").replace("−", "-")


def frac_txt(x) -> str:
    x = F(x)
    return str(x.numerator) if x.denominator == 1 else f"{x.numerator}/{x.denominator}"


def unid(u: str | None, quadrado: bool = False) -> str:
    if not u:
        return ""
    return f" {u}²" if quadrado else f" {u}"
