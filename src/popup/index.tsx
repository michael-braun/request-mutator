import ReactDOM from 'react-dom';
import React from 'react';
import App from './components/App';
import { Provider } from 'react-redux';
import { Store } from './store';
import { loadRequestRewrites } from './store/request-rewrites/actions';

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
    Store.dispatch(loadRequestRewrites());

    ReactDOM.render((
            <Provider store={Store}>
                <App/>
            </Provider>
        ),
        rootEl
    );
}

bootstrap();
