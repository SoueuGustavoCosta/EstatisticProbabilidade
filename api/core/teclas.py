"""Sequência de teclas da Casio fx-82MS para uma conta.

Vocabulário dos tokens (a MiniCalculadora da Fase 2 mapeia cada um para a tecla):
dígitos "0"-"9", ".", "+", "−", "×", "÷", "(", ")", "(−)" (negativo), "=", "√", "x²", "x³", "x⁻¹",
"x!" (SHIFT + x⁻¹), "^", "Ans", "nCr", "EXP".
"""
import re

_TOKEN = re.compile(r"x²|x³|x⁻¹|x!|nCr|Ans|EXP|\d|.")
_ANTES_DE_NEGATIVO = {None, "+", "−", "×", "÷", "(", "^"}


def teclas(expr: str, igual: bool = True) -> list[str]:
    e = expr.replace(" ", "").replace(",", ".").replace("*", "×").replace("/", "÷").replace("-", "−")
    saida: list[str] = []
    for t in _TOKEN.findall(e):
        antes = saida[-1] if saida else None
        saida.append("(−)" if t == "−" and antes in _ANTES_DE_NEGATIVO else t)
    if igual:
        saida.append("=")
    return saida
