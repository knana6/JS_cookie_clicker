// script.js
// index.html의 버튼/입력 요소들과 연결해서 "출력창(#output)"에 결과를 찍는 실습용 스크립트

// =====================
// 공통 유틸
// =====================
const output = document.getElementById("output");
const clearBtn = document.getElementById("clearBtn");

function print(message) {
  // 처음 안내 문구 제거
  const muted = output.querySelector(".output__muted");
  if (muted) muted.remove();

  const line = document.createElement("div");
  line.className = "output__line";
  line.textContent = String(message);
  output.appendChild(line);

  // 항상 최신 줄 보이게 스크롤
  output.scrollTop = output.scrollHeight;
}

function divider(title) {
  print(" ");
  print(`--- ${title} ---`);
}

function safeNumber(value, fallback = 0) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

clearBtn.addEventListener("click", () => {
  output.innerHTML = `<div class="output__line output__muted">여기에 결과가 출력됩니다.</div>`;
});

// =====================
// 여기부터 실습용 코드 작성
// =====================

// 1. let과 const
document.getElementById("runLetConst").addEventListener("click", () => {
  divider("1) let / const");

  let a = 10;
  a = 20;

  const b = 10;

  print(`let a = 10 -> a = 20 => a = ${a}`);
  print(`const b = 10 => b는 재할당 불가 (b = 20 하면 에러)`);
  print(`b = ${b}`);
});

// 2. 자료형 (number, string, boolean)
document.getElementById("runTypes").addEventListener("click", () => {
  divider("2) 자료형");

  const rawA = document.getElementById("typeA").value; // input은 항상 문자열
  const rawB = document.getElementById("typeB").value;

  // 문자열 상태로 더하기
  print(`[문자열 그대로] A="${rawA}", B="${rawB}"`);
  print(`A + A = "${rawA + rawA}"`);
  print(`B + B = "${rawB + rawB}"`);

  // 숫자로 변환해서 더하기
  const aNum = safeNumber(rawA, NaN);
  const bNum = safeNumber(rawB, NaN);

  if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
    print(`[주의] 숫자로 변환이 안 되는 값이 있음 -> Number("문자")는 NaN`);
    print(`Number(A) = ${aNum}, Number(B) = ${bNum}`);
  } else {
    print(`[숫자로 변환] Number(A)=${aNum}, Number(B)=${bNum}`);
    print(`Number(A) + Number(A) = ${aNum + aNum}`);
    print(`Number(B) + Number(B) = ${bNum + bNum}`);
  }

  // boolean 예시
  const isLogin = true;
  print(`[boolean 예시] isLogin = ${isLogin} (true/false)`);
});

// 3. if 조건문
document.getElementById("runIf").addEventListener("click", () => {
  divider("3) if문");

  const scoreVal = document.getElementById("scoreInput").value;
  const score = safeNumber(scoreVal, NaN);

  const isLogin = document.getElementById("isLoginInput").checked;

  // 로그인 상태 체크
  if (isLogin) {
    print("isLogin이 true라서: 로그인 상태입니다.");
  } else {
    print("isLogin이 false라서: 로그아웃 상태입니다.");
  }

  // 점수 조건
  if (!Number.isFinite(score)) {
    print("점수가 비어있거나 숫자가 아닙니다. 0~100을 입력해보세요.");
    return;
  }

  if (score >= 60) {
    print(`score=${score} -> 합격`);
  } else {
    print(`score=${score} -> 불합격`);
  }
});

// 4. for 반복문
document.getElementById("runFor").addEventListener("click", () => {
  divider("4) for문");

  const nVal = document.getElementById("forN").value;
  const n = safeNumber(nVal, NaN);
  const text = document.getElementById("forText").value || "Hello";

  if (!Number.isFinite(n) || n < 1) {
    print("반복 횟수 n을 1 이상 숫자로 입력하세요.");
    return;
  }

  // 너무 길어지는 것 방지
  const limit = Math.min(n, 50);
  if (n > 50) print("n이 너무 커서 50까지만 출력합니다.");

  for (let i = 1; i <= limit; i++) {
    print(`${i}: ${text}`);
  }
});
