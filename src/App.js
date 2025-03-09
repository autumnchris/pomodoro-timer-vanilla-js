import Header from './modules/Header';
import Footer from './modules/Footer';
import Timer from './modules/Timer';
import SettingsModal from './modules/SettingsModal';
import timerDone from './assets/audio/timer-done.mp3';

class App {
  constructor() {
    this.header = new Header();
    this.footer = new Footer();
    this.timer = new Timer();
    this.settingsModal = new SettingsModal(this.timer);
    this.renderApp();
    this.events();
  }

  // Event listeners
  events() {
    document.addEventListener('click', event => {
      const element = event.target;
      element.matches('.timer-buttons .play-timer') ? this.timer.playTimer() : null;
      element.matches('.timer-buttons .pause-timer') ? this.timer.pauseTimer() : null;
      element.matches('.timer-buttons .reset-timer') ? this.timer.resetTimer() : null;
      element.matches('header .settings-button') ? this.settingsModal.openSettingsModal() : null;
      element.matches('#modal .modal-button.cancel') ? this.settingsModal.closeSettingsModal() : null;
      element.matches('#modal') ? this.settingsModal.closeSettingsModal() : null;
    });

    document.addEventListener('keydown', event => {
      document.querySelector('#modal') && event.key === 'Escape' ? this.settingsModal.closeSettingsModal() : null;
     });

    document.addEventListener('submit', event => {
      const element = event.target;
      element.matches('#modal .settings-form') ? this.settingsModal.handleSubmit(event, document.querySelector('#work-timer-input').value, document.querySelector('#break-timer-input').value) : null;
    });
  }

  // DOM methods
  renderApp() {
    this.header.renderHeader('#app');
    this.renderMain('#app');
    this.footer.renderFooter('#app');
    this.timer.renderTimerCard(['main', '.audio']);
    this.timer.renderTimerButtons(['main', '.audio']);
  }

  renderMain(location) {
    const main = document.createElement('main');
    main.innerHTML = `<audio src="${timerDone}" class="audio"></audio>`;
    document.querySelector(location).appendChild(main);
  }
}

export default App;