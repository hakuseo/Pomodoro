const timer = document.querySelector('.timer');
const startBtn = document.querySelector('.start');
const pauseBtn = document.querySelector('.pause');
const stopBtn = document.querySelector('.stop');
const meatballs = document.querySelector('.meatballs');
const navBar = document.querySelector('.nav-bar');
const modeCheck = document.querySelector('.mode-check');
const audio = document.querySelector('.audio');
const countdownEl = document.querySelector('.countdown');
const fifteen = document.getElementById(15);
const thirty = document.getElementById(30);
const fortyFive = document.getElementById(45);
const startTime = 'startTimeSet';
const currentTime = 'currentTimeSet';

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
    currentTimeSet.splice(0, 1, startTimeObject.timeSec);
    countdownEl.innerText = `${time}:00`;
    startBtn.addEventListener('click', startTimer);
    saveTime();
  }
}

function navBarClickEvent(event) {
  const timer = event.target.id;
  startTimeEvent(timer);
}

function startTimer(current) {
  let timeMin = startTimeSet[0].time;
  let timeSec = startTimeSet[0].timeSec;
  let currentTime = currentTimeSet[0];
  if (
    currentTime === undefined ||
    currentTime == 900 ||
    currentTime == 1800 ||
    currentTime == 2700
  ) {
    let countDown = setInterval(function () {
      let min = Math.floor(timeSec / 60);
      let sec = timeSec % 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      countdownEl.innerHTML = `${min}:${sec}`;
      timeSec--;
      currentTimeSet.splice(0, 1, timeSec);
      saveTime();

      if (min == 0 && sec == 0) {
        timeSec;
        audio.play();
        audio.volume = 0.2;
        clearInterval(countDown);
        startBtn.style.visibility = 'visible';
        pauseBtn.style.visibility = 'hidden';
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

    stopBtn.addEventListener(
      'click',
      () => {
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
      },
      1000,
    );
  } else {
    let countDown = setInterval(function () {
      let min = Math.floor(currentTime / 60);
      let sec = currentTime % 60;
      min = min < 10 ? '0' + min : min;
      sec = sec < 10 ? '0' + sec : sec;
      countdownEl.innerHTML = `${min}:${sec}`;
      currentTime--;
      currentTimeSet.splice(0, 1, currentTime);
      saveTime();

      if (min == 0 && sec == 0) {
        currentTime;
        audio.play();
        audio.volume = 0.2;
        clearInterval(countDown);
        startBtn.style.visibility = 'visible';
        pauseBtn.style.visibility = 'hidden';
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

    stopBtn.addEventListener(
      'click',
      () => {
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
      },
      1000,
    );
  }
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

// function loadCurrentTime() {
//   const loadedCurrentTime = localStorage.getItem(currentTime);

//   if (loadedCurrentTime !== null) {
//     const parsedCurrentTime = JSON.parse(loadedCurrentTime);
//     parsedCurrentTime.forEach(function (current) {});
//   }
// }

function init() {
  loadStartTime();
  // loadCurrentTime();
  navBar.addEventListener('click', navBarClickEvent);
}

init();
