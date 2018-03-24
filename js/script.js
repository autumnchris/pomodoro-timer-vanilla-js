var timer,
workTimer,
breakTimer,
workMinutes,
workSeconds,
breakMinutes,
breakSeconds;

function setNewTimer() {
  workTimer = document.getElementById('work-timer-input').value * 60;
  breakTimer = document.getElementById('break-timer-input').value * 60;

  workMinutes = parseInt(workTimer / 60, 10);
  workSeconds = parseInt(workTimer % 60, 10);
  breakMinutes = parseInt(breakTimer / 60, 10);
  breakSeconds = parseInt(breakTimer % 60, 10);

  workMinutes = workMinutes < 10 ? '0' + workMinutes : workMinutes;
  workSeconds = workSeconds < 10 ? '0' + workSeconds : workSeconds;
  breakMinutes = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
  breakSeconds = breakSeconds < 10 ? '0' + breakSeconds : breakSeconds;

  document.getElementById('workTimer').innerHTML = workMinutes + ':' + workSeconds;
  document.getElementById('breakTimer').innerHTML = breakMinutes + ':' + breakSeconds;
}

function displayTimer() {
  setNewTimer();

  var audio = new Audio('audio/wink-sound-effect.mp3');
  var audioHasPlayed = false;

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
      workMinutes = workMinutes < 10 ? '0' + workMinutes : workMinutes;
      workSeconds = workSeconds < 10 ? '0' + workSeconds : workSeconds;

      document.querySelector('title').innerHTML = 'Work – ' + workMinutes + ':' + workSeconds;
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
        breakMinutes = breakMinutes < 10 ? '0' + breakMinutes : breakMinutes;
        breakSeconds = breakSeconds < 10 ? '0' + breakSeconds : breakSeconds;

        document.querySelector('title').innerHTML = 'Break – ' + breakMinutes + ':' + breakSeconds;
      }
      else {
        audioHasPlayed = false;

        if (audioHasPlayed === false) {
          playAudio();
          audioHasPlayed = true;
          clearInterval(timer);
          setNewTimer();
          document.getElementById('pause-timer').setAttribute('style', 'display: none');
          document.getElementById('play-timer').setAttribute('style', 'display: inline-block');
          document.querySelector('title').innerHTML = 'Pomodoro Timer';
        }
      }
    }

    document.getElementById('workTimer').innerHTML = workMinutes + ':' + workSeconds;
    document.getElementById('breakTimer').innerHTML = breakMinutes + ':' + breakSeconds;
  }

  document.getElementById('play-timer').addEventListener('click', function() {
    countDown();
    document.getElementById('play-timer').setAttribute('style', 'display: none');
    document.getElementById('pause-timer').setAttribute('style', 'display: inline-block');
  });

  document.getElementById('pause-timer').addEventListener('click', function() {
    clearInterval(timer);
    document.getElementById('pause-timer').setAttribute('style', 'display: none');
    document.getElementById('play-timer').setAttribute('style', 'display: inline-block');
  });
}

displayTimer();

document.getElementById('reset-timer').addEventListener('click', function() {
  clearInterval(timer);
  setNewTimer();
  document.getElementById('pause-timer').setAttribute('style', 'display: none');
  document.getElementById('play-timer').setAttribute('style', 'display: inline-block');
  document.querySelector('title').innerHTML = 'Pomodoro Timer';
});

document.getElementById('settings').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: block');
});

document.getElementById('save').addEventListener('click', function() {
  var workTimerInput = document.getElementById('work-timer-input').value;
  var breakTimerInput = document.getElementById('break-timer-input').value;

  if (workTimerInput.match(/^[0-9]+$/) && breakTimerInput.match(/^[0-9]+$/) && workTimerInput >= 1 && workTimerInput <= 60 && breakTimerInput >= 1 && breakTimerInput <= 60) {
    document.getElementById('error-message').setAttribute('style', 'display: none');
    clearInterval(timer);
    setNewTimer();
    document.getElementById('modal').setAttribute('style', 'display: none');
    document.getElementById('pause-timer').setAttribute('style', 'display: none');
    document.getElementById('play-timer').setAttribute('style', 'display: inline-block');
    document.querySelector('title').innerHTML = 'Pomodoro Timer';
  }
  else {
    document.getElementById('error-message').setAttribute('style', 'display: block');
  }
});

document.getElementById('cancel').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: none');
});

document.querySelector('body').addEventListener('click', function(event) {

  if (event.target.id === 'modal') {
    document.getElementById('modal').setAttribute('style', 'display: none');
  }
});
