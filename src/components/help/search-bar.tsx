import { useState, useRef, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { SearchResults } from './search-results';
import { useClickAway } from '@/hooks/use-click-away';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useClickAway(searchRef, () => {
    setShowResults(false);
  });

  const handleFocus = () => {
    setShowResults(true);
  };

  return (
    <div ref={searchRef} className="relative max-w-2xl">
      <Search className="absolute left-3 top-3 h-5 w-5 text-muted-foreground" />
      <Input
        placeholder="Buscar en el centro de ayuda..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onFocus={handleFocus}
        className="pl-10 py-6 text-lg"
      />
      {showResults && <SearchResults query={query} onClose={() => setShowResults(false)} />}
    </div>
  );
}