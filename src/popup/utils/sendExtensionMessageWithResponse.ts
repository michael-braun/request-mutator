export default function sendExtensionMessageWithResponse<T = any>(message: any): Promise<T> {
    return new Promise<T>((resolve, reject) => {
        chrome.runtime.sendMessage(message, (response) => {
            resolve(response);
        });
    })
}
