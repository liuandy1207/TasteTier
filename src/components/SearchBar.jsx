// ============================================================
// SearchBar.jsx — Google Maps-style top search bar.
// Shows restaurant count and a list of all restaurants on focus.
// ============================================================
import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ restaurants, onSelect }) {
  const [focused, setFocused] = useState(false);
  const [query, setQuery] = useState("");

  const filtered = restaurants.filter(
    (r) =>
      r.name.toLowerCase().includes(query.toLowerCase()) ||
      r.cuisine.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="searchbar-wrapper">
      {/* Input */}
      <div className={`searchbar-input-row${focused ? " focused" : ""}`}>
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setFocused(true)}
          onBlur={() => setTimeout(() => setFocused(false), 150)}
          placeholder="Search restaurants..."
          className="searchbar-input"
        />
        <span className="searchbar-count">{restaurants.length} spots</span>
      </div>

      {/* Dropdown */}
      {focused && (
        <div className="searchbar-dropdown">
          {filtered.length === 0 && (
            <div className="searchbar-empty">No results found</div>
          )}
          {filtered.map((r) => (
            <button
              key={r.id}
              className="searchbar-item"
              onMouseDown={() => {
                onSelect(r);
                setQuery("");
                setFocused(false);
              }}
            >
              <span className="searchbar-item-emoji">{r.coverEmoji}</span>
              <div>
                <div className="searchbar-item-name">{r.name}</div>
                <div className="searchbar-item-cuisine">{r.cuisine}</div>
              </div>
              <span className="searchbar-item-rating">
                {"★".repeat(r.rating)}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}