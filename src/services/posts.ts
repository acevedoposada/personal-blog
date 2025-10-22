import type { PostgrestSingleResponse } from "@supabase/supabase-js";

import { PostsStatus } from "@/constants/posts";
import type { Post } from "@/interfaces/post";
import supabase from "@/supabase";

export const getPosts = async (page: number) => {
  const pageSize = import.meta.env.POST_PER_PAGE || 9;
  const from = (page - 1) * pageSize;
  const to = from + (pageSize - 1);

  const { data, error, count } = await supabase
    .from('post')
    .select(
      'slug, title, description, published_at, featured, cover_img, tags, created_at, updated_at, status',
      { count: 'exact' }
    )
    .eq('status', PostsStatus.PUBLISHED)
    .order("published_at", { ascending: false })
    .range(from, to);
  if (error) {
    throw error;
  }

  return {
    posts: data || [],
    total: count || 0,
    page,
    pageSize: pageSize
  }
}

type RpcRow = { current: Post; suggestions: Post[] };

export async function getPost(slug: string): Promise<PostgrestSingleResponse<RpcRow[]>> {
  return await supabase
    .rpc('post_get_context', { p_slug: slug });
}