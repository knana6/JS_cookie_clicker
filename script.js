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