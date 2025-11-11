import { COUNTRIES_BY_TOP_LETTERS, VISIBLE_COUNTRY_LIMIT } from "../consts";
import { useState, useMemo } from "react";
import { useDebounced } from "../hooks/useDebounce";
import { buildTrie } from "../structures/Trie";

/**
 * A Dynamic Search Filter
 * Core Requirements: A static list of items (e.g., 10-15 country names)
 * and a search input. Filter the list in real-time as the user types.
 * What to look for: Debouncing the input to avoid filtering on every
 * keystroke. Case-insensitive matching. Handling an empty state when no results are found.
 * Bonus: Implement the debounce function from
 * scratch instead of using a library.
 */
export default function DynamicSearchFilter() {
  const [text, setText] = useState<string>("");
  const debouncedText = useDebounced(text, 150);

  // Build once
  const countryTrie = useMemo(() => buildTrie(COUNTRIES_BY_TOP_LETTERS), []);

  const [countries, setCountries] = useState<string[]>([]);

  const autoCompleteCountries: string[] = useMemo(() => {
    if (!countryTrie || !debouncedText) return [];
    return countryTrie.getWordsWithPrefix(debouncedText, VISIBLE_COUNTRY_LIMIT);
  }, [debouncedText, countryTrie]);

  const handleOnClick = (value: string) => {
    setText(value);
    setCountries(COUNTRIES_BY_TOP_LETTERS);
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <h1>Dynamic Search Filter</h1>
      <div
        style={{
          display: "flex",
          gap: "10px",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <label htmlFor="country">Country Name:</label>
        <input
          type="text"
          name="country"
          placeholder="Please add a country name"
          onChange={(e) => {
            handleOnClick(e.target.value);
          }}
          value={text}
        />
      </div>
      <div>
        {countries.length > 0 && (
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {autoCompleteCountries.map((country) => (
              <li>{country}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
