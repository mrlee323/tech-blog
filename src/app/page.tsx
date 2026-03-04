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
          mrlee<span className="text-zinc-500">의 블로그</span>
        </h1>
        <p className="max-w-[600px] text-zinc-500 md:text-xl/relaxed dark:text-zinc-400">
          복잡도를 다루는 프론트엔드 엔지니어의 기록. 코드, 설계, 그리고 AI와 함께하는 실무 이야기.
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