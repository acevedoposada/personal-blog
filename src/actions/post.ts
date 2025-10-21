import { getPostBySlug } from "@/services/posts";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const post = defineAction({
  input: z.object({
    slug: z.string()
      .nonempty('The slug value must be non empty')
  }),
  async handler({ slug }) {
    const { post, error, status } = await getPostBySlug(slug);

    if (error) {
      if (status === 406) 
        throw new ActionError({
          code: 'NOT_FOUND',
          message: 'Post not found! :('
        })
      
      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'An error was ocurred calling information'
      })
    }

    return post;
  }
})