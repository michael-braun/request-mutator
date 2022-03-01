import ResourceType = chrome.declarativeNetRequest.ResourceType;
import RuleActionType = chrome.declarativeNetRequest.RuleActionType;
import type { RequestRewriteConfig } from '../../types/RequestRewriteConfig';

export default async function updateDynamicRules(rules: RequestRewriteConfig[], removedIds?: number[]) {
    if (!removedIds) {
        removedIds = rules.map((c) => c.id);
    }

    return await chrome.declarativeNetRequest.updateDynamicRules({
        addRules: rules
            .filter(r => r.enabled)
            .map(r => ({
                id: r.id,
                action: {
                    type: RuleActionType.REDIRECT,
                    redirect: {
                        regexSubstitution: `\\1${r.replacement}\\2`,
                    }
                },
                condition: {
                    regexFilter: `^(.*)${r.pattern}(.*)`,
                    resourceTypes: [
                        ResourceType.MAIN_FRAME,
                        ResourceType.SUB_FRAME,
                    ],
                },
                priority: 1,
            })),
        removeRuleIds: removedIds,
    });
}
