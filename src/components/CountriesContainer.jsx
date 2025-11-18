import React, { useEffect, useState } from "react";
import CountryCard from "./CountryCard";
export default function CountriesList({ query }) {
  let [countriesData, setcountriesData] = useState([]);
  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,capital,languages,population,area,region,subregion,flags"
    )
      .then((res) => res.json())
      .then((data) => {
        setcountriesData(data);
      });
  }, []);
  return (
    <div className="countries-container">
      {countriesData
        .filter((country) => country.name.common.toLowerCase().includes(query))
        .map((country) => {
          return (
            <CountryCard
              key={country.name.common}
              name={country.name.common}
              flag={country.flags.svg}
              population={country.population}
              region={country.region}
              capital={country.capital?.[0]}
            />
          );
        })}
    </div>
  );
}
