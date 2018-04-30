let timer;
let workTimer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
let breakTimer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
let workMinutes;
let workSeconds;
let breakMinutes;
let breakSeconds;

function setNewTimer() {
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
  document.getElementById('work-timer-input').value = workTimer / 60;
  document.getElementById('break-timer-input').value = breakTimer / 60;
}

function displayTimer() {
  setNewTimer();
  const audio = new Audio('audio/wink-sound-effect.mp3');
  let audioHasPlayed = false;

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
        audio.play();
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
          audio.play();
          audioHasPlayed = true;
          clearInterval(timer);
          workTimer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
          breakTimer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
          setNewTimer();
          countDown();
          audioHasPlayed = false;
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

function handleSubmit(event) {
  event.preventDefault();
  const workTimerInput = document.getElementById('work-timer-input').value;
  const breakTimerInput = document.getElementById('break-timer-input').value;

  if (!isNaN(workTimerInput) && !isNaN(breakTimerInput) && workTimerInput >= 1 && workTimerInput <= 60 && breakTimerInput >= 1 && breakTimerInput <= 60) {
    document.querySelector('.error-message').style.display = 'none';
    clearInterval(timer);
    workTimer = document.getElementById('work-timer-input').value * 60;
    breakTimer = document.getElementById('break-timer-input').value * 60;
    setNewTimer();
    localStorage.setItem('workTimer', JSON.stringify(workTimer));
    localStorage.setItem('breakTimer', JSON.stringify(breakTimer));
    document.getElementById('modal').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
    document.querySelector('title').innerHTML = 'Pomodoro Timer';
  }
  else {
    document.querySelector('.error-message').style.display = 'block';
  }
}

document.querySelector('.reset-timer').addEventListener('click', () => {
  clearInterval(timer);
  workTimer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
  breakTimer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
  setNewTimer();
  document.querySelector('.pause-timer').style.display = 'none';
  document.querySelector('.play-timer').style.display = 'inline-block';
  document.querySelector('title').innerHTML = 'Pomodoro Timer';
});

document.querySelector('.settings').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.timer-settings-form').addEventListener('submit', (event) => {
  handleSubmit(event);
});

document.querySelector('.cancel').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'none';
});

window.addEventListener('click', (event) => {

  if (event.target.id === 'modal') {
    document.getElementById('modal').style.display = 'none';
  }
});
