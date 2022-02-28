import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import sendExtensionMessageWithResponse from '../../utils/sendExtensionMessageWithResponse';
import type { RequestRewriteConfig } from '../../../types/RequestRewriteConfig';
import debounce from 'lodash.debounce';
import memoize from 'lodash.memoize';

export const loadRequestRewrites = createAsyncThunk('requestRewrites/loadRequestRewrites', async () => {
    const requestRewritesResponse = await sendExtensionMessageWithResponse({
        type: 'request',
        payload: {
            method: 'GET',
            path: '/request-rewrites',
        },
    });

    console.log(requestRewritesResponse);

    return {
        requestRewrites: requestRewritesResponse.payload.body,
    };
});

export const createRequestRewrite = createAsyncThunk('requestRewrites/createRequestRewrite', async (requestRewrite: Omit<RequestRewriteConfig, 'id'>) => {
    const requestRewritesResponse = await sendExtensionMessageWithResponse({
        type: 'request',
        payload: {
            method: 'POST',
            path: '/request-rewrites',
            body: requestRewrite,
        },
    });

    return {
        requestRewrite: requestRewritesResponse.payload.body,
    };
});

const updateRequestRewritePatches: Record<number, Partial<Omit<RequestRewriteConfig, 'id'>>> = {};
const updateRequestRewriteCall = memoize((id: number) => debounce(async () => {
    console.log('updatze 1');
    const patch = updateRequestRewritePatches[id];
    if (!patch) {
        return;
    }

    delete updateRequestRewritePatches[id];

    console.log('updatze 2', patch);

    await sendExtensionMessageWithResponse({
        type: 'request',
        payload: {
            method: 'PATCH',
            path: `/request-rewrites/${id}`,
            body: patch,
        },
    });
}, 500));

export const updateRequestRewrite = createAction('requestRewrites/updateRequestRewrite', (id: number, patch: Partial<Omit<RequestRewriteConfig, 'id'>>) => {
    updateRequestRewritePatches[id] = Object.assign(updateRequestRewritePatches[id] || {}, patch);
    updateRequestRewriteCall(id)();

    return {
        payload: {
            id,
            ...patch,
        },
    };
});
