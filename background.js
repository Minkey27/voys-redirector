let redirectOption = 'vgToVoys';

function updateRedirectOption() {
    chrome.storage.local.get(['redirectOption'], function (result) {
        redirectOption = result.redirectOption || 'vgToVoys';
    });
}

updateRedirectOption();

chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (let key in changes) {
        if (key === 'redirectOption') {
            updateRedirectOption();
        }
    }
});

chrome.webRequest.onBeforeRequest.addListener(
    function (details) {
        if (details.type === 'main_frame') {
            let redirectUrl;

            if (
                redirectOption === 'vgToVoys' &&
                details.url.startsWith('https://partner.voipgrid.nl')
            ) {
                redirectUrl = details.url.replace(
                    'https://partner.voipgrid.nl',
                    'https://freedom.voys.nl'
                );
            } else if (
                redirectOption === 'voysToVg' &&
                details.url.startsWith('https://freedom.voys.nl')
            ) {
                redirectUrl = details.url.replace(
                    'https://freedom.voys.nl',
                    'https://partner.voipgrid.nl'
                );
            }

            if (redirectUrl) {
                chrome.tabs.update(details.tabId, { url: redirectUrl });
                return { cancel: true };
            }
        }
    },
    { urls: ['*://partner.voipgrid.nl/*', '*://freedom.voys.nl/*'] }
);
