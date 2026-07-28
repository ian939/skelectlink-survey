// 설문 응답(JSON POST)을 구글 시트에 한 줄씩 쌓는 Apps Script 웹앱
// 사용법:
//   1) 응답을 모을 구글 시트를 열고 확장 프로그램 > Apps Script 에 이 파일 내용을 붙여넣기
//   2) 배포 > 새 배포 > 유형: 웹 앱 / 실행 계정: 나 / 액세스 권한: 모든 사용자 로 배포
//   3) 발급된 웹 앱 URL 을 index.html 상단의 ENDPOINT 에 붙여넣기
const SHEET_NAME = '응답';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000); // 동시 제출 대비
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sh = ss.getSheetByName(SHEET_NAME);
    if (!sh) sh = ss.insertSheet(SHEET_NAME);

    // 헤더 동기화: 처음 보는 키는 헤더 행 끝에 열로 추가
    let headers = [];
    if (sh.getLastRow() >= 1 && sh.getLastColumn() >= 1) {
      headers = sh.getRange(1, 1, 1, sh.getLastColumn()).getValues()[0].filter(String);
    }
    const newKeys = Object.keys(data).filter(function (k) { return headers.indexOf(k) < 0; });
    if (newKeys.length) {
      headers = headers.concat(newKeys);
      sh.getRange(1, 1, 1, headers.length).setValues([headers]);
    }

    const row = headers.map(function (h) { return data[h] != null ? data[h] : ''; });
    sh.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}
