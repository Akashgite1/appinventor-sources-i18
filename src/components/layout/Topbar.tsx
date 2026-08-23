import { Icon } from "../ui/Icon";
import { AppInventorLogo } from "../ui/AppInventorLogo";
import { navigation, repository } from "../../data/constants";

interface TopbarProps {
  query: string;
  setQuery: (q: string) => void;
  results: Array<{ id: string; label: string }>;
}

export function Topbar({ query, setQuery, results }: TopbarProps) {
  return (
    <header className="topbar">
      <a className="brand" href="#overview" aria-label="Documentation home">
        <span className="brand-mark">
          <AppInventorLogo size={24} />
        </span>
        <span>
          App Inventor <strong>i18n</strong>
        </span>
        <span className="version">GSoC 2026</span>
      </a>

      <div className="search-wrap">
        <Icon name="search" />
        <input
          aria-label="Search documentation"
          placeholder="Search documentation…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <kbd>/</kbd>
        {query && (
          <div className="search-results">
            {results.length ? (
              results.map((item) => (
                <a key={item.id} href={`#${item.id}`} onClick={() => setQuery("")}>
                  <Icon name="book" />
                  <span>{item.label}</span>
                </a>
              ))
            ) : (
              <p>No matching section</p>
            )}
          </div>
        )}
      </div>

      <a className="repo-link" href={repository} target="_blank" rel="noreferrer">
        <Icon name="branch" />
        <span>Repository</span>
        <Icon name="external" />
      </a>
    </header>
  );
}

// Re-export navigation so callers don't need to import from two places
export { navigation };
