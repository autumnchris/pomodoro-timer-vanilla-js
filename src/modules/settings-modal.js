import { Timer } from './timer';

const SettingsModal = (() => {

  function handleSubmit(event, workTimerInput, breakTimerInput) {
    event.preventDefault();

    if (!isNaN(workTimerInput) && !isNaN(breakTimerInput) && workTimerInput >= 1 && workTimerInput <= 60 && breakTimerInput >= 1 && breakTimerInput <= 60) {
      Timer.renderTimer(Timer.renderWorkValue(workTimerInput), Timer.renderBreakValue(breakTimerInput));
      closeSettingsModal();
    }
    else {
      renderFormErrorMessage();
    }
  }

  function openSettingsModal() {
    const settingsModal = document.createElement('div');
    settingsModal.classList.add('modal');
    settingsModal.setAttribute('id', 'modal');
    settingsModal.innerHTML = `<div class="modal-content">
      <div class="modal-header">Set Custom Timer (in minutes)</div>
      <div class="modal-body">
        <form class="settings-form">
          <div class="form-group">
            <label for="work-timer-input">Work:</label>
            <input type="text" value="${Timer.renderWorkValue()}" id="work-timer-input" required />
          </div>
          <div class="form-group">
            <label for="break-timer-input">Break:</label>
            <input type="text" value="${Timer.renderBreakValue()}" id="break-timer-input" required />
          </div>
          <div class="button-group">
            <input type="submit" class="button modal-button" value="Save" />
            <input type="button" class="button modal-button cancel" value="Cancel" />
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

  function renderFormErrorMessage() {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa fa-exclamation-circle fa-lg fa-fw"></span> Please enter a number between 1 and 60 to set a custom Work Timer and Break Timer.`;

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
