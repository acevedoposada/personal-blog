import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkSmartypants from "remark-smartypants";
import remarkRehype from "remark-rehype";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeStringify from "rehype-stringify";

export async function markdownToHtml(markdown: string) {
  const file = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkSmartypants)
    .use(remarkRehype, { allowDangerousHtml: false })
    .use(rehypeSlug)
    .use(rehypeAutolinkHeadings, { behavior: "append", properties: { class: "heading-anchor" } })
    .use(rehypePrettyCode, { theme: "github-dark", keepBackground: false })
    .use(rehypeSanitize, {
      ...defaultSchema,
      attributes: {
        ...defaultSchema.attributes,
        code: [...(defaultSchema.attributes?.code ?? []), ["className"]],
        pre:  [...(defaultSchema.attributes?.pre ?? []),  ["className"], ["data-theme"]],
        span: [...(defaultSchema.attributes?.span ?? []), ["className"], ["style"]],
        a:    [...(defaultSchema.attributes?.a ?? []),    ["className"], ["rel"], ["target"]],
      },
    })
    .use(rehypeStringify)
    .process(markdown ?? "");
  return String(file);
}
