import ResourceType = chrome.declarativeNetRequest.ResourceType;
import type { RequestRewriteConfig } from '../../types/RequestRewriteConfig';

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
                    regexSubstitution: `\\1${r.replacement}\\2`,
                }
            },
            condition: {
                regexFilter: `^(.*)${r.pattern}(.*)`,
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
