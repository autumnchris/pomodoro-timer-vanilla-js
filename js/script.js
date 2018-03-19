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
