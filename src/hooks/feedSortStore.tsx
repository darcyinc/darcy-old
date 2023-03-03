import { createSignal } from 'solid-js';

type FeedSorterData = 'newest' | 'popular';

const [signal, setSignal] = createSignal<FeedSorterData>('popular');

export const useFeedSort = () => [signal, setSignal] as const;
