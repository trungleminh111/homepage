const WP_API = "https://twi.vn/wp-json/wp/v2";

export const getPosts = async (perPage = 3) => {
  const res = await fetch(`${WP_API}/posts?per_page=${perPage}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch posts");
  return res.json();
};

export const getPostBySlug = async (slug) => {
  const res = await fetch(`${WP_API}/posts?slug=${slug}&_embed`);
  if (!res.ok) throw new Error("Failed to fetch post");
  const data = await res.json();
  if (!data.length) throw new Error("Post not found");
  return data[0];
};