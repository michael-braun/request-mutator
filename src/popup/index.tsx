console.log('popup');

chrome.runtime.sendMessage({
    type: 'request',
    payload: {
        method: 'GET',
        path: '/data',
    },
}, function (response) {
    console.log(response.payload.body);
});
