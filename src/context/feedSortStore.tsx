import { createSignal } from 'solid-js';

type FeedSorterData = 'newest' | 'popular';

// eslint-disable-next-line solid/reactivity
export const useFeedSort = () => createSignal<FeedSorterData>('popular');
