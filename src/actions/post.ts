import { getPost } from "@/services/posts";
import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

export const post = defineAction({
  input: z.object({
    slug: z.string()
      .nonempty('The slug value must be non empty')
  }),
  async handler({ slug }) {
    const { data, error, status } = await getPost(slug);

    const row = data?.[0];

    if (error) {
      if (status === 406) 
        throw new ActionError({
          code: 'NOT_FOUND',
          message: 'Post not found! :('
        });
      
      throw new ActionError({
        code: 'BAD_REQUEST',
        message: 'An error was ocurred calling information'
      });
    }

    if (!row?.current) {
      throw new ActionError({
        code: 'NOT_FOUND',
        message: 'Post not found! :('
      });
    }

    return row;
  }
})