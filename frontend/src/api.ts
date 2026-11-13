// Cliente da API do Laboratório (contrato: docs/05).
export async function calcular(pedido: Record<string, unknown>) {
  const r = await fetch("/api/calcular", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(pedido),
  });
  if (!r.ok) throw new Error((await r.json().catch(() => ({}))).detail ?? `Erro ${r.status}`);
  return r.json();
}
