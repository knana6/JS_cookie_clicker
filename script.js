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

const steps = Array.from(document.querySelectorAll(".step"));
const prevStepBtn = document.getElementById("prevStep");
const nextStepBtn = document.getElementById("nextStep");
const stepLabel = document.getElementById("stepLabel");

let currentStep = 1;
const maxStep = steps.length;

function showStep(stepNum) {
    currentStep = Math.max(1, Math.min(maxStep, stepNum));

    steps.forEach((el) => {
        const s = Number(el.dataset.step);
        el.classList.toggle("is-active", s === currentStep);
    });

    stepLabel.textContent = `Step ${currentStep} / ${maxStep}`;
    prevStepBtn.disabled = currentStep === 1;
    nextStepBtn.disabled = currentStep === maxStep;
    }

    prevStepBtn.addEventListener("click", () => showStep(currentStep - 1));
    nextStepBtn.addEventListener("click", () => showStep(currentStep + 1));

    showStep(1);




    // =====================
    // 여기부터 실습용 코드 작성
    // =====================

    // 1. let과 const
    document.getElementById("runLetConst").addEventListener("click", () => {
    divider("1) let / const");

    // =====================
    // 아래에다 코드를 완성해보세요!
    // a와 b를 선언해보세요
    // =====================
    let a  = 10;
    const b = 20;
    print(`let a = 10 -> a = 20 => a = ${a}`);
    print(`const b = 10 => b는 재할당 불가 (b = 20 하면 에러)`);
    print(`b = ${b}`);
});

// 2. 자료형 (number, string, boolean)
document.getElementById("runTypes").addEventListener("click", () => {
    divider("2) 자료형");

    const rawA = document.getElementById("typeA").value; // input은 항상 문자열
    const rawB = document.getElementById("typeB").value;

  // =====================
  // 1) 문자열(string)
  // =====================
    print(`[문자열 그대로] A="${rawA}", B="${rawB}"`);
    print(`A + A = "${rawA + rawA}"`);
    print(`B + B = "${rawB + rawB}"`);

  // =====================
  // 2) 숫자(number)
  // 아래에다 코드를 완성해보세요!
  // =====================
  // TODO:
  // rawA, rawB를 숫자로 변환해서
  // aNum, bNum 변수에 각각 넣어보세요
  // 힌트: Number(...)

    let aNum;
    let bNum;

    if (!Number.isFinite(aNum) || !Number.isFinite(bNum)) {
        print(`[주의] 숫자로 변환이 안 되는 값이 있음 -> Number("문자")는 NaN`);
        print(`Number(A) = ${aNum}, Number(B) = ${bNum}`);
    } else {
        print(`[숫자로 변환] Number(A)=${aNum}, Number(B)=${bNum}`);
        print(`Number(A) + Number(A) = ${aNum + aNum}`);
        print(`Number(B) + Number(B) = ${bNum + bNum}`);
    }

  // =====================
  // 3) boolean
  // =====================
  // TODO:
  // isLogin 변수에 true 또는 false를 직접 넣어보세요
    let isLogin;

    print(`[boolean 예시] isLogin = ${isLogin} (true/false)`);
});


// 3. if 조건문
document.getElementById("runIf").addEventListener("click", () => {
  divider("3) if문");

    const scoreVal = document.getElementById("scoreInput").value;
    const score = safeNumber(scoreVal, NaN);

    const isLogin = document.getElementById("isLoginInput").checked;

    // 로그인 상태 체크
    // TODO: isLogin 값을 이용해서 조건문을 완성해보세요
    // if ( /* 여기에 조건 작성 */ ) {
    // print("isLogin이 true라서: 로그인 상태입니다.");
    // } else {
    // print("isLogin이 false라서: 로그아웃 상태입니다.");
    // }

    // 점수 조건
    if (!Number.isFinite(score)) {
    print("점수가 비어있거나 숫자가 아닙니다. 0~100을 입력해보세요.");
    return;
    }

    // TODO: score 값을 이용해서 합격 조건을 작성해보세요
    // if ( /* 여기에 조건 작성 */ ) {
    // print(`score=${score} -> 합격`);
    // } else {
    // print(`score=${score} -> 불합격`);
    // }
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

    // =====================
    // TODO:
    // for문의 조건을 완성해보세요
    // (힌트: 시작값, 조건, 증가식)
    // =====================
    // for ( /* 여기에 작성 */ ) {
    // print(`${i}: ${text}`);
    // }
});

// 5. 함수
document.getElementById("runFunc").addEventListener("click", () => {
    divider("5) function (함수)");

    const name = document.getElementById("nameInput").value || "이름없음";
    const numVal = document.getElementById("numInput").value;
    const x = safeNumber(numVal, NaN);

  // =====================
  // 1) 일반 함수
  // =====================
  // TODO:
  // 이름을 받아서 "안녕하세요 이름"을 반환하는
  // sayHello 함수를 완성해보세요
  function sayHello( /* 매개변수 */ ) {
    // return 작성
  }

  // =====================
  // 2) 화살표 함수
  // =====================
  // TODO:
  // 숫자를 받아서 2배로 만드는 화살표 함수를 완성해보세요
  const double = ( /* 매개변수 */ ) => {
    // return 작성
  };

  print(sayHello(name));

  if (!Number.isFinite(x)) {
    print("숫자를 입력하면 double(숫자) 예제를 실행합니다.");
  } else {
    print(`double(${x}) = ${double(x)}`);
  }
});


// 6. 배열과 객체
document.getElementById("runArrayObj").addEventListener("click", () => {
    divider("6) 배열 / 객체");

    const itemsRaw = document.getElementById("itemsInput").value;
    const items = itemsRaw
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);

    const userName = document.getElementById("userNameInput").value || "Kim";
    const user = { name: userName, age: 22 };

    print(`[배열] 입력: "${itemsRaw}"`);
    print(`[배열] 파싱 결과: [${items.join(", ")}]`);

    if (items.length > 0) {
        print(`[배열] 첫 번째 요소 items[0] = ${items[0]}`);
    } else {
        print("[배열] 요소가 없습니다. 예: apple, banana, orange");
    }

    // =====================
    // TODO:
    // 배열 items에 "NEW"를 추가해보세요
    // =====================
    /* 작성 */

    print(`[배열] push("NEW") 후: [${items.join(", ")}]`);

    // =====================
    // 객체
    // =====================
    print(`[객체] user.name = ${user.name}`);

    // TODO:
    // user의 age를 1 증가시켜보세요
    /* 작성 */

    print(`[객체] user.age += 1 -> ${user.age}`);
});
