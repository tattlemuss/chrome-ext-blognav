// Saves options to chrome.storage
function save_options() {
  var loc = document.getElementById('location').value;
  chrome.storage.sync.set({
    location: loc,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
function restore_options() {
  chrome.storage.sync.get({
    location: 'bl'
  }, function(items) {
    document.getElementById('location').value = items.location;
  });
}
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click', save_options);