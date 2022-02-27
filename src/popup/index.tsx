import ReactDOM from 'react-dom';
import React from 'react';

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

const rootEl = document.getElementById('app');

async function bootstrap() {
    console.log('React', React);
    ReactDOM.render((
            <div>
                Hello World!
            </div>
        ),
        rootEl
    );
}

bootstrap();
