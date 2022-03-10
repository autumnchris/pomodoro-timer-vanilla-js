import { Timer } from './timer';

const SettingsModal = (() => {

  function handleSubmit(event, workTimerInput, breakTimerInput) {
    event.preventDefault();
    removeFormErrorMessage();

    if (isNaN(workTimerInput) || workTimerInput < 1 || workTimerInput >= 61) {
      renderFormErrorMessage('Work Timer');
    }
    else if (isNaN(breakTimerInput) || breakTimerInput < 1 || breakTimerInput >= 61) {
      renderFormErrorMessage('Break Timer');
    }
    else {
      if (Math.floor(workTimerInput) !== workTimerInput) workTimerInput = Math.floor(workTimerInput);
      if (Math.floor(breakTimerInput) !== breakTimerInput) breakTimerInput = Math.floor(breakTimerInput);
      Timer.renderTimer(Timer.renderWorkValue(workTimerInput), Timer.renderBreakValue(breakTimerInput));
      closeSettingsModal();
    }
  }

  function openSettingsModal() {
    const settingsModal = document.createElement('div');
    settingsModal.classList.add('modal');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Set Custom Timer (in minutes)</div>
      <div class="modal-body">
        <form class="settings-form" novalidate>
          <div class="form-group">
            <label for="work-timer-input">Work:</label>
            <input type="text" value="${Timer.renderWorkValue()}" inputmode="numeric" id="work-timer-input" required />
          </div>
          <div class="form-group">
            <label for="break-timer-input">Break:</label>
            <input type="text" value="${Timer.renderBreakValue()}" inputmode="numeric" id="break-timer-input" required />
          </div>
          <div class="button-group">
            <button type="submit" class="button modal-button">Save</button>
            <button type="button" class="button modal-button">Cancel</button>
          </div>
        </form>
      </div>
    </div>`;

    document.querySelector('main').insertBefore(settingsModal, document.querySelector('.timer-card'));
  }

  function closeSettingsModal() {
    const settingsModal = document.getElementById('modal');
    settingsModal ? document.querySelector('main').removeChild(settingsModal) : null;
  }

  function renderFormErrorMessage(timer) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class=" fa fa-exclamation-circle fa-lg fa-fw"></span> ${timer} must be a number greater than 0 and less than 61.`;

    document.querySelector('#modal .modal-body').appendChild(errorMessage);
  }

  function removeFormErrorMessage() {
    const errorMessage = document.querySelector('.error-message');
    errorMessage ? document.querySelector('.modal-body').removeChild(errorMessage) : null;
  }

  return {
    handleSubmit,
    openSettingsModal,
    closeSettingsModal
  };
})();

export { SettingsModal };
