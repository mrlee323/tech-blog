// src/components/mdx/AdminDemo.tsx
"use client";

import { useState } from "react";

export function AdminDemo() {
  const [data, setData] = useState([
    { id: 1, name: "사용자 A", role: "Admin" },
    { id: 2, name: "사용자 B", role: "User" },
  ]);

  return (
    <div className="p-4 border rounded-xl bg-zinc-50 dark:bg-zinc-900 my-6">
      <h4 className="text-sm font-bold mb-2">AI Generated Admin Table (Demo)</h4>
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">ID</th>
            <th className="text-left p-2">Name</th>
            <th className="text-left p-2">Role</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item) => (
            <tr key={item.id} className="border-b last:border-0">
              <td className="p-2">{item.id}</td>
              <td className="p-2">{item.name}</td>
              <td className="p-2 font-mono text-indigo-500">{item.role}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button 
        onClick={() => alert("데모 데이터가 갱신되었습니다.")}
        className="mt-4 px-3 py-1 bg-zinc-900 text-white dark:bg-white dark:text-black text-xs rounded"
      >
        새 데이터 생성 (Mock)
      </button>
    </div>
  );
}