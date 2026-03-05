import { Octokit } from "octokit";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GH_TOKEN;

  // 환경변수 누락 체크
  if (!owner || !repo || !token) {
    console.error("[write] 환경변수 누락:", { owner, repo, hasToken: !!token });
    return NextResponse.json(
      { success: false, error: "서버 환경변수가 설정되지 않았습니다." },
      { status: 500 },
    );
  }

  try {
    const { title, content, slug, description } = await req.json();

    const octokit = new Octokit({ auth: token });

    const today = new Date().toISOString().split("T")[0];
    const filePath = `src/contents/posts/${slug}.mdx`;

    console.log("[write] GitHub API 요청:", { owner, repo, filePath });

    const fileContent = `---
title: "${title}"
date: "${today}"
description: "${description || `${title}에 대한 글입니다.`}"
---

${content}`;

    const response = await octokit.request(
      "PUT /repos/{owner}/{repo}/contents/{path}",
      {
        owner,
        repo,
        path: filePath,
        message: `feat: 새로운 블로그 포스트 추가 - ${title}`,
        content: Buffer.from(fileContent).toString("base64"),
      },
    );

    return NextResponse.json({
      success: true,
      url: response.data.content?.html_url,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "알 수 없는 오류";
    console.error("[write] GitHub API 에러:", error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
