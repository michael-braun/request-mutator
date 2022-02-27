import { useRef } from 'react';
import type { MutableRefObject } from 'react';

export default function useSyncedRef<T>(value: T): MutableRefObject<T> {
    const ref = useRef(value);
    ref.current = value;

    return ref;
}
