import { ActionError, defineAction } from "astro:actions";
import { z } from "astro:schema";

import { getPosts } from "@/services/posts";

export const posts = defineAction({
  input: z.object({
    page: z.number().min(1).default(1)
  }),
  async handler({ page }) {
    try {
      const { posts, ...response } = await getPosts(page);

      const orderedPosts = posts.some(posts => posts.featured) 
        ? posts.sort((a, b) => a.featured === b.featured ? 0 : a.featured ? -1 : 1)
        : posts.map((post, idx) => ({ ...post, featured: idx === 0 }));

      return { ...response, posts: orderedPosts };
    } catch (error) {
      throw new ActionError({
        message: (error as Error).message || 'Error fetching posts',
        code: 'INTERNAL_SERVER_ERROR'
      });
    }
  }
})