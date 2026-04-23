import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { getPostBySlug } from "../api/api";

const stripFeaturedImage = (html, thumbUrl) => {
  if (!thumbUrl) return html;
  
  const getBaseName = (url) => {
    const filename = url.split("/").pop();
    return filename.replace(/-\d+x\d+(\.\w+)$/, "$1");
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
    <div className="container mx-auto px-4 pt-32 pb-20 max-w-3xl animate-pulse space-y-4">
      <div className="h-8 bg-muted rounded w-2/3" />
      <div className="h-4 bg-muted rounded w-1/3" />
      <div className="h-64 bg-muted rounded" />
      {[1,2,3,4,5].map(i => <div key={i} className="h-4 bg-muted rounded" />)}
    </div>
  );

  if (error) return (
    <div className="container mx-auto px-4 pt-32 pb-20 text-center">
      <p className="text-red-500 mb-4">Không tìm thấy bài viết.</p>
      <Link to="/" className="text-tw-blue hover:underline">← Về trang chủ</Link>
    </div>
  );

  const thumb = post._embedded?.["wp:featuredmedia"]?.[0]?.source_url;
  const date = new Date(post.date).toLocaleDateString("vi-VN", {
    day: "2-digit", month: "long", year: "numeric"
  });
  const cleanContent = stripFeaturedImage(post.content.rendered, thumb);

  const siteUrl = "https://app.twbes.com";
  const pageUrl = `${siteUrl}/post/${slug}`;
  const ogImage = thumb || `${siteUrl}/og-social.png`;
  const plainTitle = post.title.rendered.replace(/<[^>]+>/g, "");
  const plainExcerpt = post.excerpt?.rendered
    ? post.excerpt.rendered.replace(/<[^>]+>/g, "").trim()
    : "Business Enhancement Solutions";

  return (
    <main className="container mx-auto px-4 pt-32 pb-20 max-w-3xl">

      <Helmet>
        <title>{plainTitle} | TECHWORLD</title>
        <meta name="description" content={plainExcerpt} />

        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="TECHWORLD" />
        <meta property="og:locale" content="vi_VN" />
        <meta property="og:url" content={pageUrl} />
        <meta property="og:title" content={`${plainTitle} | TECHWORLD`} />
        <meta property="og:description" content={plainExcerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:image:secure_url" content={ogImage} />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content={plainTitle} />

        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${plainTitle} | TECHWORLD`} />
        <meta name="twitter:description" content={plainExcerpt} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Link 
        to="/" 
        className="text-sm font-semibold text-tw-blue hover:text-tw-blue-dark transition-colors mb-10 inline-flex items-center gap-2"
      >
        <span className="text-lg">←</span> Về trang chủ
      </Link>

      <h1
        className="text-3xl md:text-5xl font-extrabold text-[#0f172a] mb-6 leading-tight"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />

      <div className="flex items-center gap-2 text-sm text-slate-500 mb-10">
        <span className="font-bold text-[#2563eb]">TECHWORLD</span>
        <span className="opacity-30">•</span>
        <span>{date}</span>
      </div>

      {thumb && (
        <div className="mb-12 shadow-2xl rounded-2xl overflow-hidden">
          <img
            src={thumb}
            alt={post.title.rendered}
            className="w-full object-cover max-h-[450px]"
          />
        </div>
      )}

      <div
        className="
          prose prose-lg max-w-none
          text-slate-700
          prose-headings:text-[#0f172a]
          prose-headings:font-bold
          prose-a:text-[#2563eb] prose-a:no-underline hover:prose-a:underline
          prose-img:rounded-2xl prose-img:shadow-lg
          prose-strong:text-[#0f172a]
          prose-p:leading-relaxed
        "
        dangerouslySetInnerHTML={{ __html: cleanContent }}
      />
    </main>
  );
};

export default PostDetail;