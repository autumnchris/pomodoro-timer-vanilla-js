class ErrorMessage {
  // DOM methods
  renderErrorMessage(message, location) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('message', 'error-message');
    errorMessage.innerHTML = `<span class="fa-solid fa-circle-exclamation fa-lg fa-fw" aria-hidden="true"></span> ${message}`;
    document.querySelector(location).appendChild(errorMessage);
  }

  removeErrorMessage(location) {
    const errorMessage = document.querySelector(`${location} .error-message`);
    errorMessage ? document.querySelector(location).removeChild(errorMessage) : null;
  }
}

export default ErrorMessage;