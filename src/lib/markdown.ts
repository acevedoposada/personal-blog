import MarkdownIt from "markdown-it";
import mila from "markdown-it-link-attributes";
import { JSDOM } from "jsdom";
import createDOMPurify from "dompurify";

const md = new MarkdownIt({ html: false, linkify: true, breaks: true })
  .use(mila, { attrs: { target: "_blank", rel: "noopener noreferrer" } });

export async function mdToHtml(markdown: string) {
  const raw = md.render(markdown ?? "");
  const window = new JSDOM("").window as unknown as Window;
  const DOMPurify = createDOMPurify(window as any);
  return DOMPurify.sanitize(raw, { USE_PROFILES: { html: true } });
}