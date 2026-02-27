function CountryCard({ country }) {
  return (
    <div className="card">
      <img src={country.flags?.png} alt={country.name?.common} />
      <h2>{country.name?.common}</h2>
      <p>
        <strong>Region:</strong> {country.region || "N/A"}
      </p>
      <p>
        <strong>Population:</strong>{" "}
        {country.population ? country.population.toLocaleString() : "N/A"}
      </p>
    </div>
  );
}

export default CountryCard;
