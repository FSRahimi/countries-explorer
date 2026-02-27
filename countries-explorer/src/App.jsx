import { useEffect, useState } from "react";
import CountryCard from "./components/CountryCard";
import SearchBar from "./components/SearchBar";
import RegionFilter from "./components/RegionFilter";
import "./App.css";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [region, setRegion] = useState("all");

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);

    try {
      let url = "";

      if (search && search.length >= 2) {
        url = `https://restcountries.com/v3.1/name/${encodeURIComponent(
          search
        )}`;
      } else if (region && region !== "all") {
        url = `https://restcountries.com/v3.1/region/${encodeURIComponent(
          region
        )}`;
      } else {
        url = "https://restcountries.com/v3.1/all"; // Home page: all countries
      }

      const res = await fetch(url);

      // Handle 404 (no results) separately
      if (!res.ok) {
        if (res.status === 404) {
          setCountries([]);
          setError(null);
          return;
        } else {
          throw new Error("Failed to fetch countries");
        }
      }

      const data = await res.json();
      setCountries(data);
    } catch (err) {
      setError(err.message);
      setCountries([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [search, region]);

  return (
    <div className="app">
      <h1>🌍 Countries Explorer</h1>
      <p className="status">Explore countries by name or region</p>

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
        {(search || region !== "all") && (
          <button
            className="clear-btn"
            onClick={() => {
              setSearch("");
              setRegion("all");
            }}
          >
            Clear Filters
          </button>
        )}
      </div>

      {loading && <p className="status">Loading countries...</p>}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchCountries}>Retry</button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && search.length >= 2 && (
        <p className="status">No results found</p>
      )}

      <div className="countries-grid">
        {countries.map((country) => (
          <CountryCard key={country.cca3} country={country} />
        ))}
      </div>
    </div>
  );
}

export default App;
