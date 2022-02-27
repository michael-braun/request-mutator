import { createAsyncThunk } from '@reduxjs/toolkit';
import sendExtensionMessageWithResponse from '../../utils/sendExtensionMessageWithResponse';

export const loadRequestRewrites = createAsyncThunk('requestRewrites/loadRequestRewrites', async () => {
    const requestRewritesResponse = await sendExtensionMessageWithResponse({
        type: 'request',
        payload: {
            method: 'GET',
            path: '/request-rewrites',
        },
    });

    return {
        requestRewrites: requestRewritesResponse.payload.body,
    };
});
