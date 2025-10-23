import type { PostgrestSingleResponse } from "@supabase/supabase-js";

import type { GetPostsResponse, Post } from "@/interfaces/post";
import supabase from "@/supabase";

export const getPosts = async (page: number): Promise<GetPostsResponse> => {
  const pageSize = import.meta.env.POST_PER_PAGE || 9;
  const { data, error } = await supabase.rpc('get_home_posts', { page, page_size: pageSize });

  if (!data) {
    throw new Error('Data doesn\'t have data');
  }

  if (error) {
    throw error;
  }

  const { featured_post, posts = [], total_count } = data;

  return {
    posts,
    featured: featured_post,
    total: total_count || 0,
    page,
    pageSize: pageSize
  }
}

type RpcRow = { current: Post; suggestions: Post[] };

export async function getPost(slug: string): Promise<PostgrestSingleResponse<RpcRow[]>> {
  return await supabase
    .rpc('post_get_context', { p_slug: slug });
}