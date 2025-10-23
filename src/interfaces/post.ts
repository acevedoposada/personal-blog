import type { PostsStatus } from "@/constants/posts";

export interface Post {
  slug: string;
  title: string;
  description: string;
  published_at: string;
  featured: boolean;
  cover_img: string;
  tags: string[];
  created_at: string;
  updated_at: string;
  status: `${PostsStatus}`;
  content: string;
}

export interface GetPostsResponse {
  posts: Post[];
  featured: Post;
  total: number;
  page: number;
  pageSize: number;
}