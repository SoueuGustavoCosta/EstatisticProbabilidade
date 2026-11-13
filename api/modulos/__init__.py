"""Um arquivo por módulo do Laboratório. Cada `calcular(pedido) -> dict` monta a Resposta do docs/05.

Erros de entrada levantam ValueError com mensagem amigável (a API devolve 422).
"""
from ..core.formatacao import CASAS


def preparar(pedido: dict) -> None:
    casas = pedido.get("casas", 2)
    if not isinstance(casas, int) or isinstance(casas, bool) or not 0 <= casas <= 6:
        raise ValueError("Casas decimais: escolha de 0 a 6.")
    CASAS.set(casas)


def tipo_dados(pedido: dict) -> bool:
    """True se população, False se amostra. Obrigatório (define σ² ou s²)."""
    t = pedido.get("tipo_dados")
    if t not in ("populacao", "amostra"):
        raise ValueError("Escolha se os dados são população ou amostra.")
    return t == "populacao"
