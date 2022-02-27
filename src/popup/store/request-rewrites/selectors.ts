import type { RootState } from '../index';
import { ENTITY_ADAPTER_REQUEST_REWRITES } from './entity-adapter';

const ENTITY_ADAPTER_REQUEST_REWRITES_SELECTORS = ENTITY_ADAPTER_REQUEST_REWRITES.getSelectors();

export const getRequestRewritesState = (state: RootState) => state.requestRewrites;
export const getRequestRewriteIds = (state: RootState) => ENTITY_ADAPTER_REQUEST_REWRITES_SELECTORS.selectIds(getRequestRewritesState(state).requestRewrites);
