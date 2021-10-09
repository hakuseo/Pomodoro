const modeCheck = document.querySelector('.mode-check');
const resetBtn = document.querySelector('.reset');
const meatballs = document.querySelector('.meatballs');
const navBar = document.querySelector('.nav-bar');
const countdownEl = document.querySelector('.countdown');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const audio = document.querySelector('.audio');
const fifteen = document.getElementById(15);
const thirty = document.getElementById(30);
const fortyFive = document.getElementById(45);
const startTime = 'startTimeSet';
const currentTime = 'currentTimeSet';

let currentTimeSet = [];
let startTimeSet = [];

// locatStorage SetItem
function saveTime() {
  localStorage.setItem(currentTime, JSON.stringify(currentTimeSet));
  localStorage.setItem(startTime, JSON.stringify(startTimeSet));
}

//다크모드, 라이트모드
const userColorTheme = localStorage.getItem('color-theme');
const osColorTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
  ? 'dark'
  : 'light';

const userTheme = userColorTheme ? userColorTheme : osColorTheme;
console.log(userTheme);

window.onload = function () {
  if (userTheme === 'dark') {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
    modeCheck.setAttribute('checked', true);
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
};

modeCheck.addEventListener('click', (e) => {
  if (e.target.checked) {
    localStorage.setItem('color-theme', 'dark');
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    localStorage.setItem('color-theme', 'light');
    document.documentElement.setAttribute('color-theme', 'light');
  }
});

// nav bar 버튼
meatballs.addEventListener('click', () => {
  navBar.classList.toggle('nav-bar-block');
});

// 타이머 설정 (세팅)
function startTimeEvent(time) {
  if (time !== '') {
    time = +time;
    let timeSec = time * 60;
    const startTimeObject = {
      time,
      timeSec,
    };
    startTimeSet.splice(0, 1, startTimeObject);
    currentTimeSet.splice(0, 1, startTimeObject.timeSec);
    countdownEl.innerText = `${time}:00`;
    navBar.classList.remove('nav-bar-block');
    saveTime();
  }
}

// start버튼 누르지 않았을 때의 리셋버튼 설정
resetBtn.addEventListener('click', (e) => {
  startTimeEvent(startTimeSet[0].time);
});

function navBarClickEvent(event) {
  const timer = event.target.id;
  startTimeEvent(timer);
}

//start버튼 클릭 이벤트
startBtn.addEventListener('click', startTimer);

// 타이머 start 함수
function startTimer(currentTime) {
  let timeMin = startTimeSet[0].time;
  currentTime = currentTimeSet[0];
  let countDown = setInterval(function () {
    let min = Math.floor(currentTime / 60);
    let sec = currentTime % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    countdownEl.innerHTML = `${min}:${sec}`;
    currentTimeSet.splice(0, 1, currentTime);
    currentTime--;
    saveTime();
    if (min == 0 && sec == 0) {
      clearInterval(countDown);
      audio.play();
      audio.volume = 0.2;
      setTimeout(() => {
        currentTime = startTimeSet[0].timeSec;
        let min = Math.floor(currentTime / 60);
        let sec = currentTime % 60;
        min = min < 10 ? '0' + min : min;
        sec = sec < 10 ? '0' + sec : sec;
        countdownEl.innerHTML = `${min}:${sec}`;
        currentTimeSet.splice(0, 1, currentTime);
        saveTime();
        startBtn.style.visibility = 'visible';
        pauseBtn.style.visibility = 'hidden';
      }, 1800);
    }
  }, 1000);
  startBtn.style.visibility = 'hidden';
  pauseBtn.style.visibility = 'visible';

  fifteen.disabled = true;
  thirty.disabled = true;
  fortyFive.disabled = true;

  pauseBtn.addEventListener('click', () => {
    clearInterval(countDown);
    startBtn.style.visibility = 'visible';
    pauseBtn.style.visibility = 'hidden';
    fifteen.disabled = false;
    thirty.disabled = false;
    fortyFive.disabled = false;
  });

  resetBtn.addEventListener('click', () => {
    clearInterval(countDown);
    timeMin = timeMin;
    currentTime = startTimeSet[0].timeSec;
    currentTimeSet.splice(0, 1, currentTime);
    saveTime();
    countdownEl.innerText = `${timeMin}:00`;
    startBtn.style.visibility = 'visible';
    pauseBtn.style.visibility = 'hidden';
    fifteen.disabled = false;
    thirty.disabled = false;
    fortyFive.disabled = false;
  });
}

function loadStartTime() {
  const loadedStartTime = localStorage.getItem(startTime);
  const loadedCurrentTime = localStorage.getItem(currentTime);
  if (loadedStartTime !== null) {
    const parsedTime = JSON.parse(loadedStartTime);
    const parsedCurrentTime = JSON.parse(loadedCurrentTime);
    parsedTime.forEach(function (time) {
      countdownEl.innerText = `${time.time}:00`;
      startTimeEvent(time.time);
    });

    parsedCurrentTime.forEach(function (current) {
      let min = Math.floor(current / 60);
      let sec = current % 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      countdownEl.innerHTML = `${min}:${sec}`;
      currentTimeSet.splice(0, 1, current);
      saveTime();
    });
  }
}

function init() {
  loadStartTime();

  navBar.addEventListener('click', navBarClickEvent);
  if (startTimeSet[0] === undefined) {
    startTimeEvent(30);
  }
}

init();

//   if ((keyCode = 'Space')) {
//     let startBtnVisible = window.getComputedStyle(startBtn).visibility;
//     let pauseBtnVisible = window.getComputedStyle(pauseBtn).visibility;
//     if (startBtnVisible === 'visible') {
//       setTimeout(() => {
//         startTimer();
//       }, 0);

//     } else {
//       setTimeOu
//       startBtn.style.visibility = 'visible';
//       pauseBtn.style.visibility = 'hidden';
//       fifteen.disabled = false;
//       thirty.disabled = false;
//       fortyFive.disabled = false;
//     }
//   }
// });
