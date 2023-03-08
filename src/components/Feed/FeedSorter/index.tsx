import { BarChart, FiberNew, Tune } from '@suid/icons-material';
import { createSignal } from 'solid-js';
import { FeedHeader, SortButton, SortOptions } from './styles';
import { useFeedSort } from '~/hooks/feedSortStore';

export default function FeedSorter() {
  const [isMenuOpen, setIsMenuOpen] = createSignal(false);
  const [sort, setSort] = useFeedSort();
  // const [popularRange, setPopularRange] = createSignal<
  //   '1d' | '1h' | '5h' | '7d' | '30m'
  // >('1h');

  const handleSortChange = () => {
    if (sort() === 'newest') setSort('popular');
    else setSort('newest');
  };

  return (
    <FeedHeader>
      <Tune onClick={() => setIsMenuOpen((isOpen) => !isOpen)} />

      {isMenuOpen() && (
        <SortOptions>
          <SortButton type="button" onClick={handleSortChange}>
            <span>
              {sort() === 'newest' ? <FiberNew /> : <BarChart />}
              {sort() === 'newest' ? 'Mais recentes' : 'Mais populares'}
            </span>
          </SortButton>

          {sort() === 'popular' && (
            <>
              <label for="time-range">Faixa de tempo</label>
              <select id="time-range" name="time-range">
                <option value="30m">30 minutos atrás</option>
                <option value="1h">1 hora atrás</option>
                <option value="3h">3 horas atrás</option>
                <option value="1d">1 dia atrás</option>
                <option value="7d">7 dias atrás</option>
              </select>
            </>
          )}
        </SortOptions>
      )}
    </FeedHeader>
  );
}
