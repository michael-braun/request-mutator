import ResourceType = chrome.declarativeNetRequest.ResourceType;
import RequestRewriteStorage from './utils/RequestRewriteStorage';
import runInBackground from './utils/runInBackground';

let color = '#3aa757';

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ color });
    console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.declarativeNetRequest.updateDynamicRules({
    addRules: [{
        id: 1,
        action: {
            type: 'redirect' as any,
            redirect: {
                regexSubstitution: 'https://example.com\\1',
            }
        },
        condition: {
            regexFilter: '^https://www.yahoo.com\?(.*)',
            resourceTypes: [
                'main_frame' as ResourceType,
                'sub_frame' as ResourceType,
            ],
        },
        priority: 1,
    }],
    removeRuleIds: [1],
}, (...args: any[]) => {
    console.log(args);
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
            console.log('reply');
            reply({
                payload: {
                    test: 'go',
                    body: await RequestRewriteStorage.getRequestRewrites(),
                }
            });
        });
        return true;
        // return;
    }

    console.log(
        sender.tab
            ? "from a content script:" + sender.tab.url
            : "from the extension"
    );
    if (request.greeting == "hello") reply({ farewell: "goodbye" });

    return true;
});
