let timer;
let workTimer;
let breakTimer;
let workMinutes;
let workSeconds;
let breakMinutes;
let breakSeconds;

function setNewTimer() {
  workTimer = document.getElementById('work-timer-input').value * 60;
  breakTimer = document.getElementById('break-timer-input').value * 60;

  workMinutes = parseInt(workTimer / 60, 10);
  workSeconds = parseInt(workTimer % 60, 10);
  breakMinutes = parseInt(breakTimer / 60, 10);
  breakSeconds = parseInt(breakTimer % 60, 10);

  workMinutes = workMinutes < 10 ? `0${workMinutes}` : workMinutes;
  workSeconds = workSeconds < 10 ? `0${workSeconds}` : workSeconds;
  breakMinutes = breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes;
  breakSeconds = breakSeconds < 10 ? `0${breakSeconds}` : breakSeconds;

  document.querySelector('.work-timer').innerHTML = `${workMinutes}:${workSeconds}`;
  document.querySelector('.break-timer').innerHTML = `${breakMinutes}:${breakSeconds}`;
}

function displayTimer() {
  setNewTimer();
  var audio = new Audio('audio/wink-sound-effect.mp3'),
  audioHasPlayed = false;

  function playAudio() {
    audio.play();
  }

  function countDown() {
    timer = setInterval(playTimer, 1000);
  }

  function playTimer() {

    if (workTimer !== 0) {
      workTimer--;
      workMinutes = parseInt(workTimer / 60, 10);
      workSeconds = parseInt(workTimer % 60, 10);
      workMinutes = workMinutes < 10 ? `0${workMinutes}` : workMinutes;
      workSeconds = workSeconds < 10 ? `0${workSeconds}` : workSeconds;

      document.querySelector('title').innerHTML = `Work – ${workMinutes}:${workSeconds}`;
    }
    else {

      if (audioHasPlayed === false) {
        playAudio();
        audioHasPlayed = true;
      }

      if (breakTimer !== 0) {
        breakTimer--;
        breakMinutes = parseInt(breakTimer / 60, 10);
        breakSeconds = parseInt(breakTimer % 60, 10);
        breakMinutes = breakMinutes < 10 ? `0${breakMinutes}` : breakMinutes;
        breakSeconds = breakSeconds < 10 ? `0${breakSeconds}` : breakSeconds;

        document.querySelector('title').innerHTML = `Break – ${breakMinutes}:${breakSeconds}`;
      }
      else {
        audioHasPlayed = false;

        if (audioHasPlayed === false) {
          playAudio();
          audioHasPlayed = true;
          clearInterval(timer);
          setNewTimer();
          countDown();
        }
      }
    }
    document.querySelector('.work-timer').innerHTML = `${workMinutes}:${workSeconds}`;
    document.querySelector('.break-timer').innerHTML = `${breakMinutes}:${breakSeconds}`;
  }

  document.querySelector('.play-timer').addEventListener('click', () => {
    countDown();
    document.querySelector('.play-timer').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'inline-block';
  });

  document.querySelector('.pause-timer').addEventListener('click', () => {
    clearInterval(timer);
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
  });
}

displayTimer();

document.querySelector('.reset-timer').addEventListener('click', () => {
  clearInterval(timer);
  setNewTimer();
  document.querySelector('.pause-timer').style.display = 'none';
  document.querySelector('.play-timer').style.display = 'inline-block';
  document.querySelector('title').innerHTML = 'Pomodoro Timer';
});

document.querySelector('.settings').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.save').addEventListener('click', () => {
  const workTimerInput = document.getElementById('work-timer-input').value;
  const breakTimerInput = document.getElementById('break-timer-input').value;

  if (workTimerInput.match(/^[0-9]+$/) && breakTimerInput.match(/^[0-9]+$/) && workTimerInput >= 1 && workTimerInput <= 60 && breakTimerInput >= 1 && breakTimerInput <= 60) {
    document.querySelector('.error-message').style.display = 'none';
    clearInterval(timer);
    setNewTimer();
    document.getElementById('modal').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
    document.querySelector('title').innerHTML = 'Pomodoro Timer';
  }
  else {
    document.querySelector('.error-message').style.display = 'block';
  }
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', event => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
