import { RequestRewriteConfig, RequestRewriteStorageState } from '../types/RequestRewriteStorage';
import updateDynamicRules from './updateDynamicRule';

const STORAGE_KEY = 'request_rewrite';

export default class RequestRewriteStorage {
    static async createRequestRewrite(config: Omit<RequestRewriteConfig, 'id'>): Promise<number> {
        const data = await this.getRequestRewritesRaw();

        const newId = data.data.length + 1;

        data.data.push({
            ...config,
            id: newId,
        });

        await chrome.storage.sync.set({ [STORAGE_KEY]: data });
        await updateDynamicRules(data.data);

        return newId;
    }

    static async updateRequestRewrite(id: number, config: Partial<Omit<RequestRewriteConfig, 'id'>>) {
        const data = await this.getRequestRewritesRaw();

        data.data[id] = Object.assign(data.data[id], config);

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

    static async getRequestRewrites() {
        return (await this.getRequestRewritesRaw()).data;
    }

    private static async getRequestRewritesRaw(): Promise<RequestRewriteStorageState> {
        const storageResponse = await chrome.storage.sync.get(STORAGE_KEY);
        if (!storageResponse?.data) {
            return { data: [] };
        }

        return storageResponse as RequestRewriteStorageState;
    }
}
