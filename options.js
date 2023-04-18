function setCurrentValue() {
    chrome.storage.local.get(['redirectOption'], function (result) {
        document.getElementById('redirectOption').value = result.redirectOption || 'vgToVoys';
    });
}

document.addEventListener('DOMContentLoaded', function () {
    // Retrieve and set the current redirect option
    setCurrentValue();

    // Add a click event listener to the save button
    document.getElementById('save').addEventListener('click', function () {
        const selectedOption = document.getElementById('redirectOption').value;
        chrome.storage.local.set({ redirectOption: selectedOption }, function () {
            alert('Settings saved.');
        });
    });
});
