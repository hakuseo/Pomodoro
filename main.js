const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const meatballs = document.querySelector('.meatballs');
const navBar = document.querySelector('.nav-bar');
const modeCheck = document.querySelector('.mode-check');
const audio = document.querySelector('.audio');
const countdownEl = document.querySelector('.countdown');
const startTime = 'startTimeSet';
const currentTime = 'currentTimeSet';
const fifteen = document.getElementById(15);
const thirty = document.getElementById(30);
const fortyFive = document.getElementById(45);

let currentTimeSet = [];
let startTimeSet = [{ time: 30, timeSec: 1800 }];

function saveTime() {
  localStorage.setItem(currentTime, JSON.stringify(currentTimeSet));
  localStorage.setItem(startTime, JSON.stringify(startTimeSet));
}

meatballs.addEventListener('click', () => {
  navBar.classList.toggle('nav-bar-flex');
});

modeCheck.addEventListener('click', (e) => {
  if (e.target.checked) {
    document.documentElement.setAttribute('color-theme', 'dark');
  } else {
    document.documentElement.setAttribute('color-theme', 'light');
  }
});

function startTimeEvent(time) {
  if (time !== '') {
    time = +time;
    let timeSec = time * 60;
    const startTimeObject = {
      time,
      timeSec,
    };
    startTimeSet.splice(0, 1, startTimeObject);
    countdownEl.innerText = `${time}:00`;
    startBtn.addEventListener('click', startTimer);
  }
  // else {
  //   return false;
  // }
}

function navBarClickEvent(event) {
  const timer = event.target.id;
  startTimeEvent(timer);
}

// function changeTimeEvent(event) {
// const timer = event.target.id;
// }

// startBtn.onclick = () => {
//   startTimer();
// };

function startTimer() {
  timeMin = startTimeSet[0].time;
  timeMin = +timeMin;
  let timeSec = timeMin * 60;

  let countDown = setInterval(function () {
    let min = Math.floor(timeSec / 60);
    let sec = timeSec % 60;
    min = min < 10 ? '0' + min : min;
    sec = sec < 10 ? '0' + sec : sec;
    countdownEl.innerHTML = `${min}:${sec}`;
    timeSec--;
    if (min == 0 && sec == 0) {
      timeSec;
      audio.play();
      audio.volume = 0.2;
      clearInterval(countDown);
      startBtn.style.visibility = 'visible';
      pauseBtn.style.visibility = 'hidden';
    }
    currentTimeSet.splice(0, 1, `${min}:${sec}`);

    saveTime();
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
    console.log(timeSec);
  });

  stopBtn.addEventListener(
    'click',
    () => {
      clearInterval(countDown);
      let innerMins = timeMin;
      countdownEl.innerText = `${innerMins}:00`;
      startBtn.style.visibility = 'visible';
      pauseBtn.style.visibility = 'hidden';
      fifteen.disabled = false;
      thirty.disabled = false;
      fortyFive.disabled = false;
    },
    1000,
  );
}

function loadStartTime() {
  const loadedStartTime = localStorage.getItem(startTime);

  if (loadedStartTime !== null) {
    const parsedTime = JSON.parse(loadedStartTime);
    parsedTime.forEach(function (time) {
      countdownEl.innerText = `${time.time}:00`;
      startTimeEvent(time.time);
    });
  }
}

function init() {
  loadStartTime();
  navBar.addEventListener('click', navBarClickEvent);
}

init();
