class Header {
  // DOM methods
  renderHeader(location) {
    const header = document.createElement('header');
    header.innerHTML = `
      <aside>
        <div class="settings-button-container">
          <button type="button" class="button settings-button" aria-label="timer settings" title="Settings">
            <span class="fa-solid fa-gear settings-icon"></span>
          </button>
        </div>
      </aside>
      <h1>Pomodoro Timer</h1>
    `;
    document.querySelector(location).appendChild(header);
  }
}

export default Header;