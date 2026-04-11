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
        <section className="
          prose prose-zinc dark:prose-invert max-w-none
          prose-base leading-8
          prose-headings:scroll-mt-20
          prose-headings:font-bold
          prose-headings:tracking-tight
          prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-4
          prose-h3:text-lg prose-h3:mt-8 prose-h3:mb-3
          prose-p:text-[1.0625rem] prose-p:leading-8 prose-p:text-zinc-700 dark:prose-p:text-zinc-300
          prose-li:text-[1.0625rem] prose-li:leading-8 prose-li:text-zinc-700 dark:prose-li:text-zinc-300
          prose-strong:text-zinc-900 dark:prose-strong:text-zinc-100
          prose-a:text-indigo-500 prose-a:no-underline hover:prose-a:underline
          prose-code:text-sm prose-code:bg-zinc-100 prose-code:dark:bg-zinc-800 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:font-normal
          prose-pre:bg-transparent prose-pre:p-0 prose-pre:my-6
          prose-hr:border-zinc-200 dark:prose-hr:border-zinc-700
        ">
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