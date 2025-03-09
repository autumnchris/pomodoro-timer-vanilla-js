import getWorkValue from '../utils/getWorkValue';
import getBreakValue from '../utils/getBreakValue';
import getTitle from '../utils/getTitle';

class Timer {
  constructor() {
    this.timer = null;
    this.workTimer = getWorkValue() * 60;
    this.breakTimer = getBreakValue() * 60;
    this.currentSession = 'Work';
    this.currentMinutes = getWorkValue();
    this.currentSeconds = 0;
    this.playStatus = 'Play';
  }

  refreshTimerValues() {
    this.workTimer = getWorkValue() * 60;
    this.breakTimer = getBreakValue() * 60;
    this.currentSession = 'Work';
    this.currentMinutes = getWorkValue();
    this.currentSeconds = 0;
  }

  resetTimer() {
    clearInterval(this.timer);
    this.timer = null;
    this.refreshTimerValues();
    this.togglePlayStatusValue(true);
    getTitle('Pomodoro Timer');

    document.querySelector('.audio').pause();
    document.querySelector('.audio').currentTime = 0;
    this.removeTimerCard('main');
    this.removeTimerButtons('main');
    this.renderTimerCard(['main', '.audio']);
    this.renderTimerButtons(['main', '.audio']);
  }

  pauseTimer() {
    clearInterval(this.timer);
    this.togglePlayStatusValue();

    document.querySelector('.audio').pause();
    this.removeTimerButtons('main');
    this.renderTimerButtons(['main', '.audio']);
  }

  countDown() {

    if (this.workTimer > 0) {
      this.workTimer--;
      this.currentMinutes = parseInt(this.workTimer / 60, 10);
      this.currentSeconds = parseInt(this.workTimer % 60, 10);
    }
    else {

      if (this.breakTimer === getBreakValue() * 60 && this.currentMinutes === 0 && this.currentSeconds === 0) {
        this.currentMinutes = getBreakValue();
        this.currentSeconds = 0;
        this.currentSession = 'Break';
        document.querySelector('.audio').play();
      }
      else {

        if (this.breakTimer > 0) {
          this.breakTimer--;
          this.currentMinutes = parseInt(this.breakTimer / 60, 10);
          this.currentSeconds = parseInt(this.breakTimer % 60, 10);
        }
        else {
          clearInterval(this.timer);
          this.workTimer = getWorkValue() * 60;
          this.breakTimer = getBreakValue() * 60;
          this.currentMinutes = this.workTimer / 60;
          this.currentSeconds = this.workTimer % 60;
          this.currentSession = 'Work';
          document.querySelector('.audio').play();
          this.playTimer(true);
        }
      }
    }

    getTitle(`${this.currentSession} - ${this.currentMinutes < 10 ? `0${this.currentMinutes}` : this.currentMinutes}:${this.currentSeconds < 10 ? `0${this.currentSeconds}` : this.currentSeconds}`);
    this.removeTimerCard('main');
    this.renderTimerCard(['main', '.timer-buttons']);
  }

  playTimer(continueTimer = false) {
    this.timer = setInterval(this.countDown.bind(this), 1000);
    if(continueTimer) return;
    this.togglePlayStatusValue();
    this.removeTimerButtons('main');
    this.renderTimerButtons(['main', '.audio']);
  }

  togglePlayStatusValue(isReset = false) {

    if (this.playStatus === 'Pause' || isReset) {
      this.playStatus = 'Play';
    }
    else if (this.playStatus === 'Play') {
      this.playStatus = 'Pause';
    }
  }

  updateTimer() {
    this.resetTimer();
    this.removeTimerCard('main');
    this.removeTimerButtons('main');
    this.renderTimerCard(['main', '.audio']);
    this.renderTimerButtons(['main', '.audio']);
  }

  // DOM methods
  renderTimerCard(location) {
    const timerCard = document.createElement('div');
    timerCard.classList.add('timer-card');
    timerCard.innerHTML = `
      <h2 class="session">${this.currentSession} Session</h2>
      <div class="timer">${this.currentMinutes < 10 ? `0${this.currentMinutes}` : this.currentMinutes}:${this.currentSeconds < 10 ? `0${this.currentSeconds}` : this.currentSeconds}</div>
    `;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(timerCard);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(timerCard, document.querySelector(location[1]));
    }
  }

  renderTimerButtons(location) {
    const timerButtons = document.createElement('div');
    timerButtons.classList.add('button-group', 'timer-buttons');
    timerButtons.innerHTML = `
      <button type="button" class="button timer-button ${this.playStatus.toLowerCase()}-timer" aria-label="${this.playStatus.toLowerCase()} timer" title="${this.playStatus}">
        <span class="fa-solid fa-${this.playStatus.toLowerCase()} fa-lg timer-icon"></span>
      </button>
      <button type="button" class="button timer-button reset-timer" aria-label="reset timer" title="Reset">
        <span class="fa-solid fa-rotate-right fa-lg timer-icon"></span>
      </button>
    `;

    if (typeof location === 'string') {
      document.querySelector(location).appendChild(timerButtons);
    }
    else if (Array.isArray(location)) {
      document.querySelector(location[0]).insertBefore(timerButtons, document.querySelector(location[1]));
    }
  }

  removeTimerCard(location) {
    const timerCard = document.querySelector(`${location} .timer-card`);
    timerCard ? document.querySelector(location).removeChild(timerCard) : null;
  }

  removeTimerButtons(location) {
    const timerButtons = document.querySelector(`${location} .timer-buttons`);
    timerButtons ? document.querySelector(location).removeChild(timerButtons) : null;
  }
}

export default Timer;