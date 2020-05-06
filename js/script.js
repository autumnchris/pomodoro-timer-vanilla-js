function displayTimer() {
  let timer = null;
  let workLength = JSON.parse(localStorage.getItem('workTimer')) || 25;
  let breakLength = JSON.parse(localStorage.getItem('breakTimer')) || 5;
  let currentMinutes = workLength;
  let currentSeconds = 0;
  let currentSession = 'Work';
  let workTimer = workLength * 60;
  let breakTimer = breakLength * 60;

  currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
  currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;

  function countDown() {
    timer = setInterval(playTimer, 1000);
  }

  function playTimer() {

    if (workTimer > 0) {
      workTimer--;
      currentMinutes = parseInt(workTimer / 60, 10);
      currentSeconds = parseInt(workTimer % 60, 10);
    }
    else {
      if (breakTimer === breakLength * 60 && Number(currentMinutes) === 0 && Number(currentSeconds) === 0) {
        document.querySelector('.audio').play();
        currentMinutes = breakLength;
        currentSeconds = 0;
        currentSession = 'Break';
      }
      else {

        if (breakTimer > 0) {
          breakTimer--;
          currentMinutes= parseInt(breakTimer / 60, 10);
          currentSeconds = parseInt(breakTimer % 60, 10);
        }
        else {
          document.querySelector('.audio').play();
          clearInterval(timer);
          workTimer = workLength * 60;
          breakTimer = breakLength * 60;
          currentMinutes = parseInt(workTimer / 60, 10);
          currentSeconds = parseInt(workTimer % 60, 10);
          currentSession = 'Work';
          countDown();
        }
      }
    }
    currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    document.querySelector('.session').innerHTML = `${currentSession} Session`;
    document.querySelector('.timer').innerHTML = `${currentMinutes}:${currentSeconds}`;
    document.title = `${currentSession} – ${currentMinutes}:${currentSeconds}`;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const workTimerInput = document.getElementById('work-timer-input').value;
    const breakTimerInput = document.getElementById('break-timer-input').value;

    if (!isNaN(workTimerInput) && !isNaN(breakTimerInput) && workTimerInput >= 1 && workTimerInput <= 60 && breakTimerInput >= 1 && breakTimerInput <= 60) {
      clearInterval(timer);
      workLength = workTimerInput;
      breakLength = breakTimerInput;
      currentMinutes = workLength;
      currentSeconds = 0;
      currentSession = 'Work';
      currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
      currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
      workTimer = workLength * 60;
      breakTimer = breakLength * 60;
      localStorage.setItem('workTimer', JSON.stringify(workLength));
      localStorage.setItem('breakTimer', JSON.stringify(breakLength));
      document.querySelector('.error-message').style.display = 'none';
      document.querySelector('.session').innerHTML = `${currentSession} Session`;
      document.querySelector('.timer').innerHTML = `${currentMinutes}:${currentSeconds}`;
      document.getElementById('work-timer-input').value = workLength;
      document.getElementById('break-timer-input').value = breakLength;
      document.getElementById('modal').style.display = 'none';
      document.querySelector('.pause-timer').style.display = 'none';
      document.querySelector('.play-timer').style.display = 'inline-block';
      document.title = 'Pomodoro Timer';
    }
    else {
      document.querySelector('.error-message').style.display = 'block';
    }
  }

  document.querySelector('.play-timer').addEventListener('click', () => {
    countDown();
    document.querySelector('.play-timer').style.display = 'none';
    document.querySelector('.pause-timer').style.display = 'inline-block';
  });

  document.querySelector('.pause-timer').addEventListener('click', () => {
    clearInterval(timer);
    document.querySelector('.audio').pause();
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
  });

  document.querySelector('.reset-timer').addEventListener('click', () => {
    clearInterval(timer);
    document.querySelector('.audio').pause();
    document.querySelector('.audio').currentTime = 0;
    workTimer = workLength * 60;
    breakTimer = breakLength * 60;
    currentMinutes = workLength;
    currentSeconds = 0;
    currentMinutes = currentMinutes < 10 ? `0${currentMinutes}` : currentMinutes;
    currentSeconds = currentSeconds < 10 ? `0${currentSeconds}` : currentSeconds;
    currentSession = 'Work';
    document.querySelector('.session').innerHTML = `${currentSession} Session`;
    document.querySelector('.timer').innerHTML = `${currentMinutes}:${currentSeconds}`;
    document.querySelector('.pause-timer').style.display = 'none';
    document.querySelector('.play-timer').style.display = 'inline-block';
    document.title = 'Pomodoro Timer';
  });

  document.querySelector('.settings-button').addEventListener('click', () => {
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

  document.querySelector('.timer').innerHTML = `${currentMinutes}:${currentSeconds}`;
  document.getElementById('work-timer-input').value = workLength;
  document.getElementById('break-timer-input').value = breakLength;
}

displayTimer();

document.querySelector('.current-year').innerHTML = new Date().getFullYear();
