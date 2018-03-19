document.getElementById('settings').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: block');
});

document.getElementById('cancel').addEventListener('click', function() {
  document.getElementById('modal').setAttribute('style', 'display: none');
});
