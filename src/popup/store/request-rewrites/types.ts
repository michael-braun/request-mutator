import type { FetchStatus } from '../../constants/fetch-status';
import type { EntityState } from '@reduxjs/toolkit';
import type { RequestRewriteConfig } from '../../../types/RequestRewriteConfig';

export type RequestRewritesState = {
    fetchStatus: FetchStatus;
    requestRewrites: EntityState<RequestRewriteConfig>,
};
