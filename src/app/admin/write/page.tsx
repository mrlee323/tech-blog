"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function WritePage() {
  const router = useRouter();
  const [post, setPost] = useState({
    title: "",
    slug: "",
    description: "",
    content: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/write", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });

    if (res.ok) {
      alert("글이 성공적으로 등록되었습니다! 1~3분 뒤 배포됩니다.");
      router.push("/");
    } else {
      const data = await res.json();
      alert(`등록 실패: ${data.error}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-10 flex flex-col gap-4 max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="제목"
        required
        className="border p-2"
        value={post.title}
        onChange={(e) => setPost({ ...post, title: e.target.value })}
      />
      <input
        type="text"
        placeholder="slug (영어 파일명, 예: my-new-post)"
        required
        className="border p-2"
        value={post.slug}
        onChange={(e) => setPost({ ...post, slug: e.target.value })}
      />
      <input
        type="text"
        placeholder="설명 (description, 선택사항)"
        className="border p-2"
        value={post.description}
        onChange={(e) => setPost({ ...post, description: e.target.value })}
      />
      <textarea
        placeholder="내용 (MDX)"
        required
        className="border p-2 h-64"
        value={post.content}
        onChange={(e) => setPost({ ...post, content: e.target.value })}
      />
      <button type="submit" className="bg-blue-500 text-white p-2">
        등록하기
      </button>
    </form>
  );
}
