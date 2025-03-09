import ErrorMessage from './ErrorMessage';
import getWorkValue from '../utils/getWorkValue';
import getBreakValue from '../utils/getBreakValue';

class SettingsModal {
  constructor(timerInstance) {
    this.errorMessage = new ErrorMessage();
    this.timer = timerInstance;
  }

  handleSubmit(event, workValue, breakValue) {
    event.preventDefault();
    workValue = Number(workValue.trim());
    breakValue = Number(breakValue.trim());
    this.errorMessage.removeErrorMessage('#modal .modal-body');

    if (isNaN(workValue) || workValue < 1 || workValue >= 61) {
      this.errorMessage.renderErrorMessage('Work Timer must be a number greater than 0 and less than 61.', '#modal .modal-body');
    }
    else if (isNaN(breakValue) || breakValue < 1 || breakValue >= 61) {
      this.errorMessage.renderErrorMessage('Break Timer must be a number greater than 0 and less than 61.', '#modal .modal-body');
    }
    else {
      this.updateTimer(workValue, breakValue);
      this.closeSettingsModal();
    }
  }

  updateTimer(workValue, breakValue) {
    if (Math.floor(workValue) !== workValue) workValue = Math.floor(workValue);
    if (Math.floor(breakValue) !== breakValue) breakValue = Math.floor(breakValue);
    getWorkValue(workValue);
    getBreakValue(breakValue);
    this.timer.updateTimer();
  }

  openSettingsModal() {
    this.renderSettingsModal('main');
  }

  closeSettingsModal() {
    this.removeSettingsModal('main');
  }

  // DOM methods
  renderSettingsModal(location) {
    const settingsModal = document.createElement('div');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.classList.add('modal');
    settingsModal.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">Set Custom Timer (in minutes)</div>
        <div class="modal-body">
          <form class="settings-form" novalidate>
            <div class="form-group">
              <label for="work-timer-input">Work:</label>
              <input type="text" value="${getWorkValue()}" name="workTimer" inputmode="numeric" id="work-timer-input" autocomplete="off" required />
            </div>
            <div class="form-group">
              <label for="break-timer-input">Break:</label>
              <input type="text" value="${getBreakValue()}" name="breakTimer" inputmode="numeric" id="break-timer-input" autocomplete="off" required />
            </div>
            <div class="button-group">
              <button type="submit" class="button modal-button submit">Save</button>
              <button type="button" class="button modal-button cancel">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    `;
    document.querySelector(location).appendChild(settingsModal);
    document.querySelector('body').classList.add('modal-open');
  }

  removeSettingsModal(location) {
    const settingsModal = document.querySelector(`${location} #modal`);
    settingsModal ? document.querySelector(location).removeChild(settingsModal) : null;
    document.querySelector('body').classList.remove('modal-open');
  }
}

export default SettingsModal;