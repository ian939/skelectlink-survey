# skelectlink-survey

전기택시 충전 이용 실태 및 멤버십 수요 조사 (SK일렉링크) — 모바일 웹 설문.

- **설문 링크 (GitHub Pages)**: https://ian939.github.io/skelectlink-survey/
- 단일 `index.html` 파일로 동작하며 이미지·지도까지 모두 내장되어 있어 별도 서버가 필요 없습니다.
- 응답 기한: 26년 8월 9일(일) / 응답자 전원 SK일렉링크 5,000 무상 포인트 지급.

## 구글 시트 연동 (응답 수집)

1. 응답을 모을 구글 시트를 새로 만들고 **확장 프로그램 > Apps Script** 를 엽니다.
2. [`apps-script/Code.gs`](apps-script/Code.gs) 내용을 붙여넣고 저장합니다.
3. **배포 > 새 배포 > 유형: 웹 앱** 을 선택하고 아래처럼 설정해 배포합니다.
   - 실행 계정: **나**
   - 액세스 권한: **모든 사용자**
4. 발급된 웹 앱 URL(`https://script.google.com/macros/s/.../exec`)을 `index.html` 상단의 `ENDPOINT` 상수에 넣고 커밋하면 끝입니다.

```js
const ENDPOINT = 'https://script.google.com/macros/s/.../exec';
```

- 제출 시 JSON 이 POST 되고, 스크립트가 시트의 `응답` 탭에 한 줄씩 추가합니다. 헤더(열 이름)는 첫 제출 때 자동 생성됩니다.
- `ENDPOINT` 가 비어 있으면 제출 화면에서 "응답 내용 복사하기" 버튼이 대신 표시됩니다 (테스트용).

## 수정 이력 관리

설문 문항·디자인 수정은 `index.html` 을 직접 수정한 뒤 push 하면 1~2분 내 Pages 에 반영됩니다.
