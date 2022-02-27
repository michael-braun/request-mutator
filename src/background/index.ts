import ResourceType = chrome.declarativeNetRequest.ResourceType;
import RequestRewriteStorage from './utils/RequestRewriteStorage';
import runInBackground from './utils/runInBackground';

chrome.runtime.onInstalled.addListener(() => {
    console.log('installed');
});

chrome.declarativeNetRequest.getDynamicRules((...args: any[]) => {
    console.log(args);
});

chrome.runtime.onMessage.addListener((request, sender, reply) => {
    if (request.type !== 'request' || !request.payload || !request.payload.method || !request.payload.path) {
        return false;
    }

    if (request.payload.method === 'GET' && request.payload.path === '/data') {
        runInBackground(async () => {
            reply({
                payload: {
                    body: await RequestRewriteStorage.getRequestRewrites(),
                }
            });
        });
        return true;
    }

    console.log(
        sender.tab
            ? "from a content script:" + sender.tab.url
            : "from the extension"
    );
    if (request.greeting == "hello") reply({ farewell: "goodbye" });

    return true;
});
