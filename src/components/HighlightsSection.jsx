import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import { getPosts } from "../api/api";
import StatsSection from "./StatsSection";

const HighlightsSection = () => {
  const {
    data: posts = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["posts", 3], // phải giống Footer
    queryFn: () => getPosts(3),
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: false,
  });

  return (
    <>

      <StatsSection />

      {/* News */}
      <section id="news" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-center text-3xl md:text-4xl font-extrabold text-foreground mb-12">
            Tin Tức <span className="text-tw-blue">Mới Nhất</span>
          </h2>

          {/* Loading */}
          {isLoading && (
            <div className="grid md:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-background rounded-xl overflow-hidden shadow-md border animate-pulse"
                >
                  <div className="h-48 bg-muted" />
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-muted rounded w-3/4" />
                    <div className="h-3 bg-muted rounded w-1/2" />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Error */}
          {isError && (
            <p className="text-center text-red-500">
              Không tải được bài viết
            </p>
          )}

          {/* Data */}
          {!isLoading && !isError && (
            <div className="grid md:grid-cols-3 gap-8">
              {posts.map((post) => {
                const thumb = post._embedded?.["wp:featuredmedia"]?.[0]?.media_details?.sizes?.medium?.source_url;
                const date = new Date(post.date).toLocaleDateString(
                  "vi-VN",
                  {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  }
                );

                return (
                  <article
                    key={post.id}
                    className="bg-background rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow group border"
                  >
                    {/* IMAGE */}
                    <div className="h-48 overflow-hidden">
                      {thumb && (
                        <img
                          src={thumb}
                          alt={post.title.rendered}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          loading="lazy"
                        />
                      )}
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <div className="text-xs text-muted-foreground mb-2">
                        {date}
                      </div>

                      <h3
                        className="font-bold text-foreground mb-2 line-clamp-2 group-hover:text-tw-blue transition-colors"
                        dangerouslySetInnerHTML={{
                          __html: post.title.rendered,
                        }}
                      />

                      <p
                        className="text-sm text-muted-foreground line-clamp-2"
                        dangerouslySetInnerHTML={{
                          __html: post.excerpt?.rendered || "",
                        }}
                      />

                      <Link
                        to={`/tin-tuc/${post.slug}`}
                        className="inline-block mt-3 text-sm font-semibold text-tw-blue hover:underline"
                      >
                        Đọc Thêm →
                      </Link>
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default HighlightsSection;