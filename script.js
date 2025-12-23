// =======================
// 1. 게임 상태 객체
// =======================
const game = {
  cookieCount: 0,
  cps: 0,
  upgradeCost: 50,
};

// =======================
// 2. DOM 요소 가져오기
// =======================
const cookieCountSpan = document.getElementById("cookieCount");
const cpsSpan = document.getElementById("cps");
const upgradeCostSpan = document.getElementById("upgradeCost");

const cookieBtn = document.getElementById("cookieBtn");
const upgradeBtn = document.getElementById("upgradeBtn");

// =======================
// 3. 화면 갱신 함수
// =======================
function updateUI() {
  cookieCountSpan.textContent = game.cookieCount;
  cpsSpan.textContent = game.cps;
  upgradeCostSpan.textContent = game.upgradeCost;
}

// 초기 1번 호출
updateUI();

// =======================
// 4. 버튼 이벤트
// =======================

const cookieImg = document.getElementById("cookieImg");
let isBite = false;
let animLock = false;

cookieBtn.addEventListener("click", () => {
  if (animLock) return;          // 연타 시 튀는 거 방지
//   animLock = true;

  game.cookieCount += 1;
  updateUI();

  // 1) 살짝 페이드
  cookieImg.classList.add("cookie-fade");

  // 2) 아주 짧게 뒤에 이미지 교체
  setTimeout(() => {
    cookieImg.src = isBite ? "cookie.png" : "cookie_biten.png";
    isBite = !isBite;

    // 3) 페이드 복구 + 팝
    cookieImg.classList.remove("cookie-fade");
    cookieImg.classList.add("cookie-pop");

    setTimeout(() => {
      cookieImg.classList.remove("cookie-pop");
      animLock = false;
    }, 120);
  }, 90);
});


// 업그레이드 버튼
upgradeBtn.addEventListener("click", () => {
  if (game.cookieCount >= game.upgradeCost) {
    game.cookieCount -= game.upgradeCost;
    game.cps += 1;
    game.upgradeCost = Math.floor(game.upgradeCost * 1.5);
    updateUI();
  } else {
    alert("쿠키가 부족합니다!");
  }
});

// =======================
// 5. 초당 쿠키 증가 (타이머)
// =======================
setInterval(() => {
  if (game.cps > 0) {
    game.cookieCount += game.cps;
    updateUI();
  }
}, 1000);
