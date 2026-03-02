import { getPostBySlug } from '@/lib/mdx';
import { notFound } from 'next/navigation';
import Image from 'next/image';

// 마크다운 내에서 사용할 커스텀 컴포넌트 정의
const components = {
  img: (props: any) => (
    <Image
      {...props}
      width={800}
      height={450}
      className="rounded-lg border border-zinc-200 dark:border-zinc-800"
      alt={props.alt || ''}
    />
  ),
  // 여기에 AI 자동화 결과물 등을 보여줄 커스텀 대시보드 컴포넌트 등을 추가 가능
};

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  
  try {
    const { content, frontmatter } = await getPostBySlug(slug);

  // const headings = extractHeadings(posts);


    return (
      <article className="mx-auto max-w-2xl py-10">
        {/* 상단 메타데이터 */}
        <header className="mb-10 space-y-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <time>{frontmatter.date}</time>
            <span>•</span>
            <span>Frontend Engineering</span>
          </div>
          <h1 className="text-4xl font-extrabold tracking-tight text-zinc-900 dark:text-zinc-100">
            {frontmatter.title}
          </h1>
          {frontmatter.description && (
            <p className="text-xl text-zinc-500 dark:text-zinc-400">
              {frontmatter.description}
            </p>
          )}
        </header>

        <hr className="my-10 border-zinc-100 dark:border-zinc-800" />

        {/* 본문 - prose 클래스로 스타일링 제어 */}
        <section className="prose prose-zinc dark:prose-invert max-w-none 
          prose-headings:scroll-mt-20 
          prose-headings:font-bold 
          prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:underline
          prose-pre:bg-zinc-900 prose-pre:border prose-pre:border-zinc-800">
          {content}
        </section>

        {/* 하단 푸터 (이전/다음 글 혹은 공유) */}
        <footer className="mt-20 border-t border-zinc-100 pt-10 dark:border-zinc-800">
          <a href="/blog" className="text-sm font-medium text-indigo-500 hover:text-indigo-600">
            ← 목록으로 돌아가기
          </a>
        </footer>
      </article>
    );
  } catch (e) {
    notFound();
  }
}