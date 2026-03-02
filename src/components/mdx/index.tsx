// src/components/mdx/index.ts (중앙 관리소)
import dynamic from 'next/dynamic';

// 무거운 데모 컴포넌트들은 dynamic import로 필요할 때만 로드 (성능 최적화)
export const mdxComponents = {
  AdminDemo: dynamic(() => import('./AdminDemo').then(mod => mod.AdminDemo)),
  // 새로운 데모가 추가되면 여기 한 줄만 추가하면 끝
};