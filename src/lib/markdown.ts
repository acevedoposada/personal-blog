import { unified } from "unified";
import remarkParse from "remark-parse";
import remarkGfm from "remark-gfm";
import remarkDeflist from "remark-deflist";
import remarkBreaks from "remark-breaks";
import remarkCallout from "@r4ai/remark-callout";
import remarkSmartypants from "remark-smartypants";
import { remarkMark } from "remark-mark-highlight";
import remarkSupersub from "remark-supersub";
import remarkEmoji from "remark-emoji";
import remarkHeadingId from "remark-heading-id";

import remarkRehype from "remark-rehype";
import rehypeRaw from "rehype-raw";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSanitize, { defaultSchema } from "rehype-sanitize";
import rehypeStringify from "rehype-stringify";

type MdOptions = {
  headingLinkClass?: string;
  shikiTheme?: string;
};

export async function markdownToHtml(markdown: string, opts: MdOptions = {}) {
  const processor = unified()
    .use(remarkParse)
    .use(remarkGfm, { singleTilde: false })
    .use(remarkDeflist)
    .use(remarkBreaks)
    .use(remarkCallout)
    .use(remarkSmartypants)
    .use(remarkMark)
    .use(remarkSupersub)
    .use(remarkEmoji, { emoticon: false })
    .use(remarkHeadingId)
    .use(remarkRehype, { allowDangerousHtml: true, clobberPrefix: "" })
    .use(rehypeRaw)
    .use(rehypeAutolinkHeadings, {
      behavior: "append",
      properties: {
        class: opts.headingLinkClass ?? "heading-anchor",
        ariaHidden: "true",
        tabIndex: -1
      },
      content: { type: "text", value: " #" }
    })
    .use(rehypePrettyCode as any, {
      theme: opts.shikiTheme ?? "github-dark",
      keepBackground: false,
    })
    .use(rehypeSanitize, {
      ...defaultSchema,
      clobberPrefix: "",
      tagNames: [
        ...(defaultSchema.tagNames || []),
        "mark", "details", "summary", "br"
      ],
      attributes: {
        ...defaultSchema.attributes,
        "*": [
          ...(defaultSchema.attributes?.["*"] || []),
          "className", "data*", "style"
        ],
        code: [...(defaultSchema.attributes?.code || []), ["className"], ["data-line-numbers"]],
        pre:  [...(defaultSchema.attributes?.pre || []), ["className"], ["data-theme"]],
        span: [...(defaultSchema.attributes?.span || []), ["className"], ["style"]],
        a:    [...(defaultSchema.attributes?.a || []), ["className"], ["rel"], ["target"]],
        mark: [...(defaultSchema.attributes?.mark || []), ["className"]],
        sup:  [...(defaultSchema.attributes?.sup || [])],
        sub:  [...(defaultSchema.attributes?.sub || [])],
        dl:   [...(defaultSchema.attributes?.dl || [])],
        dt:   [...(defaultSchema.attributes?.dt || [])],
        dd:   [...(defaultSchema.attributes?.dd || [])],
        div: [
          ...(defaultSchema.attributes?.div || []),
          ["className"], ["role"],
          ["data-callout"], ["data-callout-type"], ["data-callout-title"], ["data-callout-body"]
        ],
      },
    })
    .use(rehypeStringify);

  const file = await processor.process(markdown ?? "");
  return String(file);
}
