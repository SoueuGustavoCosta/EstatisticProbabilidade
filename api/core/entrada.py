"""Leitura amigável dos números digitados (docs/05, "Validação amigável")."""
import re
from fractions import Fraction

from .formatacao import F

_TRACO_SEPARADOR = re.compile(r"\s[–—-]\s")
_NUMERO = re.compile(r"[-−]?\d+(?:[.,]\d+)?")


def ler_numeros(entrada) -> list[Fraction]:
    """Aceita lista, ou texto separado por vírgula+espaço, ';', espaço, quebra de linha ou ' – '.
    Vírgula colada em dígito é decimal ("56,75")."""
    if isinstance(entrada, (list, tuple)):
        try:
            return [F(v) for v in entrada]
        except (TypeError, ValueError, ZeroDivisionError):
            raise ValueError("Só números, por favor. Confira se não ficou nenhuma letra na lista.")
    texto = _TRACO_SEPARADOR.sub(" ", str(entrada))
    achados = _NUMERO.findall(texto)
    sobra = _NUMERO.sub(" ", texto)
    if re.search(r"[^\s,;]", sobra):
        raise ValueError("Só números, por favor. Confira se não ficou nenhuma letra na lista.")
    return [F(n) for n in achados]
