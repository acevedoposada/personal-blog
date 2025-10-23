import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { getPosts } from "@/services/posts";

export const posts = defineAction({
  input: z.object({
    page: z.number().min(1).default(1)
  }),
  async handler({ page }) {
    try {
      return await getPosts(page);
    } catch (error) {
      throw new ActionError({
        message: (error as Error).message || 'Error fetching posts',
        code: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
})