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
}

displayTimer();

document.getElementById('settings').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: block');
});

document.getElementById('cancel').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: none');
});

document.querySelector('body').addEventListener('click', function(event) {

  if (event.target.id === 'modal') {
    document.getElementById('modal').setAttribute('style', 'display: none');
  }
});
