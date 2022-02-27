import { createAsyncThunk } from '@reduxjs/toolkit';
import sendExtensionMessageWithResponse from '../../utils/sendExtensionMessageWithResponse';
import type { RequestRewriteConfig } from '../../../types/RequestRewriteConfig';

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
        },
    });

    return {
        requestRewrite: requestRewritesResponse.payload.body,
    };
});
