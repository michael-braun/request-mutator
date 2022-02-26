export default function runInBackground(cb: () => Promise<void>): void {
    cb().catch(ex => console.error(ex));
}
