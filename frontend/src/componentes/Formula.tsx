import katex from "katex";
import "katex/dist/katex.min.css";

export default function Formula({ latex, bloco = true }: { latex: string; bloco?: boolean }) {
  const html = katex.renderToString(latex, { throwOnError: false, displayMode: bloco });
  return <span dangerouslySetInnerHTML={{ __html: html }} />;
}
