import { PostsStatus } from "@/constants/posts";
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

export async function getPostBySlug(slug: string) {
  const { data, error, status } = await supabase
    .from('post')
    .select('*')
    .eq('slug', slug)
    .single();

  return {
    post: data,
    error,
    status
  }
}