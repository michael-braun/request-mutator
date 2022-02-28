import ResourceType = chrome.declarativeNetRequest.ResourceType;
import RequestRewriteStorage from './utils/RequestRewriteStorage';
import runInBackground from './utils/runInBackground';

chrome.runtime.onInstalled.addListener(() => {
    console.log('installed');
});

chrome.declarativeNetRequest.getDynamicRules((...args: any[]) => {
    console.log(args);
});

const REGEX_PATCH_PATH = /^\/request-rewrites\/([0-9]*)$/;

chrome.runtime.onMessage.addListener((request, sender, reply) => {
    console.log('request', request);

    if (request.type !== 'request' || !request.payload || !request.payload.method || !request.payload.path) {
        return false;
    }

    if (request.payload.method === 'GET' && request.payload.path === '/request-rewrites') {
        runInBackground(async () => {
            const requestRewrites = await RequestRewriteStorage.getRequestRewrites();

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
            console.log('request', request);
            const createdId = await RequestRewriteStorage.createRequestRewrite(request.payload.body);
            const requestRewrite = await RequestRewriteStorage.getRequestRewrite(createdId);

            reply({
                payload: {
                    body: requestRewrite,
                },
            });
        });
        return true;
    }

    const patchPathMatch = request.payload.path.match(REGEX_PATCH_PATH);
    console.log(request, patchPathMatch);
    if (request.payload.method === 'PATCH' && patchPathMatch) {
        const id = parseInt(patchPathMatch[1], 10);
        if (!id) {
            reply({
                payload: {
                    status: 400,
                    body: null,
                },
            });
            return true;
        }

        runInBackground(async () => {
            console.log('request', request);
            await RequestRewriteStorage.updateRequestRewrite(id, request.payload.body);
            const requestRewrite = await RequestRewriteStorage.getRequestRewrite(id);

            reply({
                payload: {
                    status: 200,
                    body: requestRewrite,
                },
            });
        });
        return true;
    }

    if (request.payload.method === 'DELETE' && patchPathMatch) {
        const id = parseInt(patchPathMatch[1], 10);
        if (!id) {
            reply({
                payload: {
                    status: 400,
                    body: null,
                },
            });
            return true;
        }

        runInBackground(async () => {
            console.log('request', request);
            await RequestRewriteStorage.deleteRequestRewrite(id);

            reply({
                payload: {
                    status: 204,
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
