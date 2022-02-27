import { createSlice } from '@reduxjs/toolkit';
import { loadRequestRewrites } from './actions';
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
            ENTITY_ADAPTER_REQUEST_REWRITES.addMany(state.requestRewrites, action.payload.requestRewrites);
        }),
});

export default RequestRewritesSlice.reducer;
