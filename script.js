// TODO: 1. 게임 상태를 관리하는 객체를 가져온다 -> 완료
// TODO: 2. DOM을 사용해서 HTML에 있는 id를 가져온다 -> 완료
// TODO: 3. 화면 갱신을 전반적으로 하는 관리 함수를 가져온다 -> 완료
// TODO: 4. 버튼 이벤틀를 작동시키는 함수를 만든다
// TODO: 5. 자동 사냥이 가능하게 하는 쿠키 증가 이벤트를 만든다

const game = {
  CookieCount: 0,
  cps: 0,
  upgradeCost: 50,
}

// getElementsByClassName의 차이는 단일 id를 가져오냐 
// 여러개를 관리할 수 있는 class를 가져오냐의 차이!
const scoreSpan = document.getElementsByClassName("score-panel");           
const cookieCountSpan = document.getElementById("cookieCount");
const cpsSpan = document.getElementById("cps");
const upgradeCostSpan = document.getElementById("upgradeCost");

const cookieBtn = document.getElementById("cookieBtn");
const upgradeBtn = document.getElementById("upgradeBtn");


//전반적으로 게임을 관리하는 함수
// -> 쿠키 클릭 업데이트, 업그레이드 구매하는 이벤트, 자동 증가하는 이벤트
function updateUI(){
  cookieCountSpan.textContent = game.CookieCount;
  cpsSpan.textContent = game.cps;
  upgradeCostSpan.textContent = game.upgradeCost;
}

updateUI();

const cookieImg = document.getElementById("cookieImg");

let isBite = false;
let animLock = false;

cookieBtn.addEventListener("click", () => {
  if(animLock) return;
  animLock = true;

  game.CookieCount += 1;
  updateUI();

  cookieImg.classList.add("cookie-fade");

  setTimeout(() => {
    cookieImg.src = isBite ? "cookie.png" : "cookie_biten.png"
    isBite = !isBite;
    cookieImg.classList.remove("cookie-fade");
    cookieImg.classList.add("cookie-pop");
  
    setTimeout(() => {
      cookieImg.classList.remove("cookie-pop");
      animLock = false;
    }, 120)
  })
})

upgradeBtn.addEventListener("click", () => {
  if(game.CookieCount >= game.upgradeCost){
    game.CookieCount -= game.upgradeCost;
    game.cps += 1;
    game.upgradeCost = Math.floor(game.upgradeCost * 1.5);
    updateUI();
  }
else{
    alert("쿠키가 부족합니다!");
 }

 setInterval(() => {
  if (game.cps > 0){
    game.CookieCount += game.cps;
    updateUI();
  }
},1000)

});