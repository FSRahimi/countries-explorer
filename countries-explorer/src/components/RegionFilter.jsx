function RegionFilter({ region, setRegion }) {
  return (
    <select value={region} onChange={(e) => setRegion(e.target.value)}>
      <option value="all">All</option>
      <option value="Africa">Africa</option>
      <option value="Americas">Americas</option>
      <option value="Asia">Asia</option>
      <option value="Europe">Europe</option>
      <option value="Oceania">Oceania</option>
    </select>
  );
}

export default RegionFilter;
