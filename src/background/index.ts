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

    console.log('get request', request);

    if (request.payload.method === 'GET' && request.payload.path === '/request-rewrites') {
        runInBackground(async () => {
            const requestRewrites = await RequestRewriteStorage.getRequestRewrites();

            console.log('requestRewrites', requestRewrites);

            reply({
                payload: {
                    body: requestRewrites,
                },
            });
        });
        return true;
    }

    if (request.payload.method === 'POST' && request.payload.path === '/request-rewrites') {
        runInBackground(async () => {
            const createdId = await RequestRewriteStorage.createRequestRewrite(request.payload.body);
            const requestRewrite = await RequestRewriteStorage.getRequestRewrite(createdId);

            console.log('created requestRewrite', createdId, requestRewrite)

            reply({
                payload: {
                    body: requestRewrite,
                },
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
