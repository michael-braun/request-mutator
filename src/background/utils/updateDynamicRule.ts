import type { RequestRewriteConfig } from '../types/RequestRewriteStorage';

export default async function updateDynamicRules(rules: RequestRewriteConfig[], removedIds?: number[]) {
    if (!removedIds) {
        removedIds = rules.map((c) => c.id);
    }

    return await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules.map(r => ({
            id: r.id,
            action: {
                type: 'redirect' as any,
                redirect: {
                    regexSubstitution: 'https://example.com\\1',
                }
            },
            condition: {
                regexFilter: '^https://www.yahoo.com\?(.*)',
                resourceTypes: [
                    'main_frame' as ResourceType,
                    'sub_frame' as ResourceType,
                ],
            },
            priority: 1,
        })),
        removeRuleIds: removedIds,
    });
}
