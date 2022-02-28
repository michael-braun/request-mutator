import { createSlice } from '@reduxjs/toolkit';
import { createRequestRewrite, loadRequestRewrites, updateRequestRewrite } from './actions';
import type { RequestRewritesState } from './types';
import { FetchStatus } from '../../constants/fetch-status';
import { ENTITY_ADAPTER_REQUEST_REWRITES } from './entity-adapter';

const initialState: RequestRewritesState = {
    fetchStatus: FetchStatus.FETCHING,
    requestRewrites: ENTITY_ADAPTER_REQUEST_REWRITES.getInitialState(),
};

const RequestRewritesSlice = createSlice({
    name: 'requestRewrites',
    reducers: {},
    initialState,
    extraReducers: builder => builder
        .addCase(loadRequestRewrites.fulfilled, (state, action) => {
            ENTITY_ADAPTER_REQUEST_REWRITES.setAll(state.requestRewrites, action.payload.requestRewrites);
        })
        .addCase(updateRequestRewrite, (state, action) => {
            const { id, ...changes } = action.payload;

            ENTITY_ADAPTER_REQUEST_REWRITES.updateOne(state.requestRewrites, {
                id,
                changes,
            });
        }),
});

export default RequestRewritesSlice.reducer;
