## ⌨️ Shortcut Commands
- **'자동 커밋'** 혹은 **'gc'**라고 요청하면 다음 절차를 즉시 수행한다:
  1. `git add .`는 실행하지 않는다. 이미 스테이징된 파일만 대상으로 한다.
  2. `git diff --cached`로 스테이징된 변경사항을 분석한다.
  3. `src/automation/ai-agent/gen-commit.ts` 규칙에 따라 Conventional Commits 형식으로 한글 메시지 작성
  4. `git commit` 실행
  - 스테이징된 파일이 없으면 커밋하지 않고 안내한다.
