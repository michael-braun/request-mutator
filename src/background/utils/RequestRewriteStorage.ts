import updateDynamicRules from './updateDynamicRule';
import type { RequestRewriteConfig } from '../../types/RequestRewriteConfig';
import type { RequestRewriteStorageState } from '../types/RequestRewriteStorage';

const STORAGE_KEY = 'request_rewrite';

export default class RequestRewriteStorage {
    static async createRequestRewrite(config: Omit<RequestRewriteConfig, 'id'>): Promise<number> {
        const data = await this.getRequestRewritesRaw();

        const newId = data.data.length + 1;

        data.data.push({
            ...config,
            id: newId,
        });

        console.log(config);

        await chrome.storage.sync.set({ [STORAGE_KEY]: data });
        await updateDynamicRules(data.data);

        return newId;
    }

    static async updateRequestRewrite(id: number, config: Partial<Omit<RequestRewriteConfig, 'id'>>) {
        const data = await this.getRequestRewritesRaw();

        data.data[id - 1] = Object.assign(data.data[id - 1], config);

        await chrome.storage.sync.set({ [STORAGE_KEY]: data });
        await updateDynamicRules(data.data);
    }

    static async deleteRequestRewrite(id: number): Promise<boolean> {
        const data = await this.getRequestRewritesRaw();

        const removedIds = data.data.map(i => i.id);

        data.data.splice(id, 1);

        for (let i = id, z = data.data.length; i < z; i += 1) {
            data.data[i].id = i;
        }

        await chrome.storage.sync.set({ [STORAGE_KEY]: data });
        await updateDynamicRules(data.data, removedIds);

        return true;
    }

    static async getRequestRewrites(): Promise<RequestRewriteConfig[]> {
        return (await this.getRequestRewritesRaw()).data;
    }

    static async getRequestRewrite(id: number): Promise<RequestRewriteConfig | null> {
        return (await this.getRequestRewritesRaw()).data[id - 1] || null;
    }

    private static async getRequestRewritesRaw(): Promise<RequestRewriteStorageState> {
        const storageResponse = await chrome.storage.sync.get();
        if (!storageResponse?.[STORAGE_KEY]?.data) {
            return { data: [] };
        }

        console.log(storageResponse);

        return storageResponse[STORAGE_KEY] as RequestRewriteStorageState;
    }
}
