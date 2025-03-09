class Footer {
  // DOM methods
  renderFooter(location) {
    const footer = document.createElement('footer');
    footer.innerHTML = `Created by <a href="https://autumnchris.github.io/portfolio" target="_blank">Autumn Bullard</a> &copy; ${new Date().getFullYear()}`;
    document.querySelector(location).appendChild(footer);
  }
}

export default Footer;