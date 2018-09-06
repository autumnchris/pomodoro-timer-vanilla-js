const timerData = {
  timer: null,
  work: {
    timer: JSON.parse(localStorage.getItem('workTimer')) || 1500,
    minutes: null,
    seconds: null
  },
  break: {
    timer: JSON.parse(localStorage.getItem('breakTimer')) || 300,
    minutes: null,
    seconds: null
  }
};

function setNewTimer() {
  timerData.work.minutes = parseInt(timerData.work.timer / 60, 10);
  timerData.work.seconds = parseInt(timerData.work.timer % 60, 10);
  timerData.break.minutes = parseInt(timerData.break.timer / 60, 10);
  timerData.break.seconds = parseInt(timerData.break.timer % 60, 10);

  timerData.work.minutes = timerData.work.minutes < 10 ? `0${timerData.work.minutes}` : timerData.work.minutes;
  timerData.work.seconds = timerData.work.seconds < 10 ? `0${timerData.work.seconds}` : timerData.work.seconds;
  timerData.break.minutes = timerData.break.minutes < 10 ? `0${timerData.break.minutes}` : timerData.break.minutes;
  timerData.break.seconds = timerData.break.seconds < 10 ? `0${timerData.break.seconds}` : timerData.break.seconds;

  document.querySelector('.work-timer').innerHTML = `${timerData.work.minutes}:${timerData.work.seconds}`;
  document.querySelector('.break-timer').innerHTML = `${timerData.break.minutes}:${timerData.break.seconds}`;
  document.getElementById('work-timer-input').value = timerData.work.timer / 60;
  document.getElementById('break-timer-input').value = timerData.break.timer / 60;
}

function displayTimer() {
  setNewTimer();
  const audio = new Audio('audio/wink-sound-effect.mp3');
  let audioHasPlayed = false;

  function countDown() {
    timerData.timer = setInterval(playTimer, 1000);
  }

  function playTimer() {

    if (timerData.work.timer !== 0) {
      timerData.work.timer--;
      timerData.work.minutes = parseInt(timerData.work.timer / 60, 10);
      timerData.work.seconds = parseInt(timerData.work.timer % 60, 10);
      timerData.work.minutes = timerData.work.minutes < 10 ? `0${timerData.work.minutes}` : timerData.work.minutes;
      timerData.work.seconds = timerData.work.seconds < 10 ? `0${timerData.work.seconds}` : timerData.work.seconds;

      document.title = `Work – ${timerData.work.minutes}:${timerData.work.seconds}`;
    }
    else {

      if (audioHasPlayed === false) {
        audio.play();
        audioHasPlayed = true;
      }

      if (timerData.break.timer !== 0) {
        timerData.break.timer--;
        timerData.break.minutes = parseInt(timerData.break.timer / 60, 10);
        timerData.break.seconds = parseInt(timerData.break.timer % 60, 10);
        timerData.break.minutes = timerData.break.minutes < 10 ? `0${timerData.break.minutes}` : timerData.break.minutes;
        timerData.break.seconds = timerData.break.seconds < 10 ? `0${timerData.break.seconds}` : timerData.break.seconds;

        document.title = `Break – ${timerData.break.minutes}:${timerData.break.seconds}`;
      }
      else {
        audioHasPlayed = false;

        if (audioHasPlayed === false) {
          audio.play();
          audioHasPlayed = true;
          clearInterval(timerData.timer);
          timerData.work.timer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
          timerData.break.timer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
          setNewTimer();
          countDown();
          audioHasPlayed = false;
        }
      }
    }
    document.querySelector('.work-timer').innerHTML = `${timerData.work.minutes}:${timerData.work.seconds}`;
    document.querySelector('.break-timer').innerHTML = `${timerData.break.minutes}:${timerData.break.seconds}`;
  }

  document.querySelector('.play-timer').addEventListener('click', () => {
    countDown();
    document.querySelector('.play-timer').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'inline-block';
  });

  document.querySelector('.pause-timer').addEventListener('click', () => {
    clearInterval(timerData.timer);
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
    clearInterval(timerData.timer);
    timerData.work.timer = document.getElementById('work-timer-input').value * 60;
    timerData.break.timer = document.getElementById('break-timer-input').value * 60;
    setNewTimer();
    localStorage.setItem('workTimer', JSON.stringify(timerData.work.timer));
    localStorage.setItem('breakTimer', JSON.stringify(timerData.break.timer));
    document.getElementById('modal').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
    document.title = 'Pomodoro Timer';
  }
  else {
    document.querySelector('.error-message').style.display = 'block';
  }
}

document.querySelector('.reset-timer').addEventListener('click', () => {
  clearInterval(timerData.timer);
  timerData.work.timer = JSON.parse(localStorage.getItem('workTimer')) || 1500;
  timerData.break.timer = JSON.parse(localStorage.getItem('breakTimer')) || 300;
  setNewTimer();
  document.querySelector('.pause-timer').style.display = 'none';
  document.querySelector('.play-timer').style.display = 'inline-block';
  document.title = 'Pomodoro Timer';
});

document.querySelector('.settings').addEventListener('click', () => {
  document.getElementById('modal').style.display = 'block';
});

document.querySelector('.settings-form').addEventListener('submit', (event) => {
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
