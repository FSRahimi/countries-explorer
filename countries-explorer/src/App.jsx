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
    try {
      setLoading(true);
      setError(null);

      let url = "";

      if (search.length >= 2) {
        url = `https://restcountries.com/v3.1/name/${search}`;
      } else if (region !== "all") {
        url = `https://restcountries.com/v3.1/region/${region}`;
      } else {
        url = `https://restcountries.com/v3.1/all`;
      }

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Failed to fetch countries");
      }

      const data = await response.json();
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

      <div className="controls">
        <SearchBar search={search} setSearch={setSearch} />
        <RegionFilter region={region} setRegion={setRegion} />
      </div>

      {loading && <p className="status">Loading countries...</p>}

      {error && (
        <div className="error">
          <p>Error: {error}</p>
          <button onClick={fetchCountries}>Retry</button>
        </div>
      )}

      {!loading && !error && countries.length === 0 && (
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
