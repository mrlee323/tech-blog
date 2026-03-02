import { getAllPosts } from '@/lib/mdx';
import Link from 'next/link';

export default async function BlogListPage() {
  const posts = await getAllPosts();

  return (
    <div className="mx-auto max-w-2xl py-12 px-4">
      <header className="mb-12">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Writing
        </h1>
        <p className="mt-4 text-zinc-500 dark:text-zinc-400">
          4년차 프론트엔드 엔지니어로서 겪은 기술적 문제 해결과 기록들입니다.
        </p>
      </header>

      <div className="flex flex-col gap-10">
        {posts.map((post) => (
          <article key={post.slug} className="group relative flex flex-col items-start">
            <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100 group-hover:text-blue-500 transition">
              <Link href={`/blog/${post.slug}`}>
                <span className="absolute -inset-x-4 -inset-y-6 z-20 sm:-inset-x-6 sm:rounded-2xl" />
                <span className="relative z-10">{post.frontmatter.title}</span>
              </Link>
            </h2>
            <time className="relative z-10 order-first mb-3 flex items-center pl-3.5 text-sm text-zinc-400 dark:text-zinc-500">
              <span className="absolute inset-y-0 left-0 flex items-center" aria-hidden="true">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
              </span>
              {post.frontmatter.date}
            </time>
            <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2">
              {post.frontmatter.description}
            </p>
            <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-blue-500">
              Read article
              <svg className="ml-1 h-3 w-3 stroke-current" fill="none" viewBox="0 0 12 12">
                <path d="M4.5 9l3-3-3-3" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}