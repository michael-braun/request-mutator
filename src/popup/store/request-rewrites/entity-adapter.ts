import { createEntityAdapter } from '@reduxjs/toolkit';
import type { RequestRewriteConfig } from '../../../types/RequestRewriteConfig';

export const ENTITY_ADAPTER_REQUEST_REWRITES = createEntityAdapter<RequestRewriteConfig>({
    selectId: r => r.id,
});
