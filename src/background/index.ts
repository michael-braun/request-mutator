import ResourceType = chrome.declarativeNetRequest.ResourceType;

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
