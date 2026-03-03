import Image from "next/image";
import Link from "next/link";
import { getBlogs } from "../../lib/api";

export const metadata = {
  title: "Blog | Tips & Guides",
};

export default async function BlogIndexPage() {
  let posts = [];

  try {
    const res = await getBlogs();
    const items = res?.success ? res?.data : null;
    if (Array.isArray(items)) {
      posts = items.map((b) => {
        const rawHtml = b.description || "";
        const text = rawHtml
          .replace(/<[^>]+>/g, " ")
          .replace(/\s+/g, " ")
          .trim();
        const excerpt =
          text.length > 220 ? `${text.slice(0, 220).trimEnd()}…` : text;

        return {
          id: b.id,
          title: b.title,
          excerpt,
          imageUrl: b.image || "/no-image.svg",
          category: "Blog",
          readTime: "2 min read",
          createdAt: b.created_at,
        };
      });
    }
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error("Failed to load blogs", err);
  }

  return (
    <div className="bg-gray-50 min-h-screen py-10 md:py-16">
      <div className="max-w-6xl mx-auto px-4 md:px-6">
        <header className="mb-8 md:mb-10">
          <p className="text-xs text-gray-400 mb-2">
            <Link href="/" className="hover:text-brand-red font-medium">
              Home
            </Link>{" "}
            / <span className="text-brand-red font-semibold">Blog</span>
          </p>
          <h1 className="text-2xl md:text-4xl font-extrabold text-gray-900 tracking-tight">
            Tips & <span className="text-brand-red">Guides</span>
          </h1>
          <p className="mt-2 text-sm md:text-base text-gray-500 max-w-2xl">
            All posts from your store’s ecommerce blog, in one place.
          </p>
        </header>

        {posts.length === 0 ? (
          <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center">
            <p className="text-gray-700 font-semibold text-lg mb-1">
              No blog posts yet
            </p>
            <p className="text-gray-400 text-sm">
              Once you publish articles, they will appear here.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:gap-8 md:grid-cols-2">
            {posts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-lg hover:border-brand-red/20 transition-all duration-300 flex flex-col"
              >
                <div className="w-full aspect-video relative overflow-hidden bg-gray-100">
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    unoptimized
                    className="object-cover object-center"
                  />
                  <div className="absolute top-2 left-2 md:top-3 md:left-3">
                    <span className="bg-brand-red text-white text-[9px] md:text-[11px] font-bold px-2.5 py-0.5 md:py-1 rounded-full uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>
                </div>
                <div className="p-4 md:p-6 flex flex-col gap-2 flex-1">
                  <h2 className="font-extrabold text-gray-900 text-base md:text-xl leading-snug">
                    {post.title}
                  </h2>
                  <p className="text-gray-500 text-xs md:text-sm leading-relaxed flex-1">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between text-[10px] md:text-xs text-gray-400 mt-1">
                    <span className="uppercase tracking-wider font-semibold">
                      {post.readTime}
                    </span>
                    {post.createdAt && (
                      <span>
                        {new Date(post.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

