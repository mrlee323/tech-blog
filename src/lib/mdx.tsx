import fs from 'fs';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import { mdxComponents } from '@/components/mdx'

// 마크다운 파일이 저장된 경로 설정
const POSTS_PATH = path.join(process.cwd(), 'src/contents/posts');

export async function getPostBySlug(slug: string) {
  // 1. 파일 경로 확인 (slug.mdx 또는 slug.md)
  const fileName = slug.endsWith('.mdx') || slug.endsWith('.md') 
    ? slug 
    : `${slug}.mdx`;
  
  const filePath = path.join(POSTS_PATH, fileName);

  // 파일 존재 여부 체크
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  // 2. 파일 내용 읽기 (fileContent)
  const fileContent = fs.readFileSync(filePath, 'utf8');

  // 3. compileMDX를 통해 텍스트를 리액트 컴포넌트로 변환
  const { content, frontmatter } = await compileMDX<{
    title: string;
    date: string;
    description: string;
  }>({
    source: fileContent,
    options: { 
      parseFrontmatter: true, // 제목, 날짜 등 메타데이터 추출 활성화
      mdxOptions: {
      
        // 여기에 rehypeShiki 같은 플러그인을 추가할 수 있습니다.
      }
    },
    // 마크다운 내에서 사용할 커스텀 컴포넌트들
    components: {
      ...mdxComponents,
      h1: (props) => <h1 className="text-3xl font-bold mt-8 mb-4" {...props} />,
      p: (props) => <p className="leading-7 mb-4" {...props} />,
    }, 
  });

  return { content, frontmatter, slug };
}

// 목록 페이지를 위한 모든 포스트 가져오기 함수 (추가)
export async function getAllPosts() {
  const files = fs.readdirSync(POSTS_PATH);
  
  const posts = await Promise.all(
    files.map(async (fileName) => {
      const slug = fileName.replace(/\.mdx?$/, '');
      const { frontmatter } = await getPostBySlug(slug);
      return { slug, frontmatter };
    })
  );

  // 최신순 정렬
  return posts.sort((a, b) => (a.frontmatter.date > b.frontmatter.date ? -1 : 1));
}

// src/lib/mdx.ts 에 추가
export function extractHeadings(content: string) {
  // 마크다운에서 ##, ### 로 시작하는 행을 찾아 제목만 추출
  const headingLines = content.split('\n').filter((line) => line.match(/^#{2,3} /));

  return headingLines.map((line) => {
    const text = line.replace(/^#{2,3} /, '').trim();
    const level = line.split(' ')[0].length;
    const id = text.toLowerCase().replace(/\s+/g, '-').replace(/[^\wㄱ-ㅎㅏ-ㅣ가-힣-]/g, '');
    return { text, level, id };
  });
}