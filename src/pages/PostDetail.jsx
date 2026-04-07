// src/pages/PostDetail.jsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getPostBySlug } from "../api/api";

const stripFeaturedImage = (html, thumbUrl) => {
  if (!thumbUrl) return html;
  
  // Lấy tên file gốc, bỏ phần kích thước (-1024x246, -300x72, ...)
  const getBaseName = (url) => {
    const filename = url.split("/").pop(); // image-2.png
    return filename.replace(/-\d+x\d+(\.\w+)$/, "$1"); // image-2.png
  };

  const thumbBase = getBaseName(thumbUrl);
  const parser = new DOMParser();
  const doc = parser.parseFromString(html, "text/html");

  doc.querySelectorAll("img").forEach((img) => {
    const imgBase = getBaseName(img.src);
    if (imgBase === thumbBase) {
      const figure = img.closest("figure");
      if (figure) figure.remove();
      else img.remove();
    }
  });

  return doc.body.innerHTML;
};

const PostDetail = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    getPostBySlug(slug)
      .then(setPost)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [slug]);

  if (loading) return (
    <div className="container mx-auto px-4 py-20 max-w-3xl animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-2/3" />
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-64 bg-muted rounded" />
      {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-muted rounded" />)}
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 py-20 text-center">
      <p className="text-red-500 mb-4">Không tìm thấy bài viết.</p>
      <Link to="/" className="text-tw-blue hover:underline">← Về trang chủ</Link>
    </div>
  );

  const thumb = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "long", year: "numeric"
  });
  const cleanContent = stripFeaturedImage(post.content.rendered, thumb);

  return (
    <main className="container mx-auto px-4 py-20 max-w-3xl">
      <Link to="/" className="text-sm text-tw-blue hover:underline mb-8 inline-block">
        ← Về trang chủ
      </Link>

      <h1
        className="text-3xl md:text-4xl font-extrabold text-foreground mb-4 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-8">
        <span className="font-semibold text-tw-blue">TECHWORLD</span>
        <span>•</span>
        <span>{date}</span>
      </div>

      {thumb && (
        <img
          src={thumb}
          alt={post.title.rendered}
          className="w-full rounded-xl mb-10 object-cover max-h-96"
        />
      )}

      <div
        className="
          prose prose-lg max-w-none
          text-foreground
          prose-headings:text-foreground
          prose-a:text-tw-blue prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-xl prose-img:w-full
          prose-strong:text-foreground
        "
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    </main>
  );
};

export default PostDetail;