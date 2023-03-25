import timerDone from '../assets/audio/timer-done.mp3';
import { SettingsModal } from './SettingsModal';
import { Timer } from './Timer';

const App = (() => {

  function renderApp() {
    document.getElementById('app').innerHTML = `
    <header>
      <div class="settings-button-container">
        <button type="button" class="button settings-button" aria-label="settings" title="Settings">
          <span class="fa fa-cog settings-icon"></span>
        </button>
      </div>
      <h1>Pomodoro Timer</h1>
    </header>
    <main>
      <div class="timer-card"></div>
      <div class="button-group timer-buttons"></div>
      <audio src="${timerDone}" class="audio">
    </main>
    <footer>Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}</footer>`;

    Timer.renderTimer(Timer.renderWorkValue(), Timer.renderBreakValue());

    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.settings-button') ? SettingsModal.openSettingsModal() : null;
      element.matches('#modal .modal-button.cancel') ? SettingsModal.closeSettingsModal() : null;
      element.matches('#modal') ? SettingsModal.closeSettingsModal() : null;
      element.matches('.play-timer') ? Timer.countDown() : null;
      element.matches('.pause-timer') ? Timer.pauseTimer() : null;
      element.matches('.reset-timer') ? Timer.renderTimer(Timer.renderWorkValue(), Timer.renderBreakValue()) : null;
    });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('.settings-form') ? SettingsModal.handleSubmit(event, document.getElementById('work-timer-input').value, document.getElementById('break-timer-input').value) : null;
    });
  }

  return {
    renderApp
  };
})();

export { App };
