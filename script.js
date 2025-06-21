document.getElementById('petForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('petName').value;
  const type = document.getElementById('petType').value;

  const listItem = document.createElement('li');
  listItem.textContent = `${name} (${type})`;

  document.getElementById('petList').appendChild(listItem);

  this.reset();
});
