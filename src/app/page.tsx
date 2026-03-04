// src/app/page.tsx
import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';

export default async function HomePage() {
  const posts = await getAllPosts();
  const recentPosts = posts.slice(0, 3);

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl">
          Frontend Engineer <span className="text-zinc-500">(4 YoE)</span>
        </h1>
        <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed dark:text-zinc-400">
          대규모 트래픽 최적화와 AI 기반 자동화로 비즈니스 가치를 극대화합니다.
        </p>
      </section>

      {/* Featured Posts (최근 글 2~3개) */}
      <section className="space-y-6">
        <h2 className="text-2xl font-bold">Recent Posts</h2>
        <div className="grid gap-4">
          {recentPosts.map(({ slug, frontmatter }) => (
            <Link
              key={slug}
              href={`/blog/${slug}`}
              className="group relative flex flex-col space-y-2 border-b border-zinc-100 pb-4 dark:border-zinc-800"
            >
              <span className="text-sm text-zinc-500">{frontmatter.date}</span>
              <h3 className="text-xl font-semibold group-hover:text-indigo-500">
                {frontmatter.title}
              </h3>
              {frontmatter.description && (
                <p className="text-sm text-zinc-500 dark:text-zinc-400">
                  {frontmatter.description}
                </p>
              )}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}