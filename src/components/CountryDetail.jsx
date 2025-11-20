import React, { useContext, useEffect, useState } from "react";
import "./CountryDetail.css";
import Loader from "./Loader";
import { Link, useParams } from "react-router-dom";
import { Themecontext } from "../Context/themecontext";
const CountryDetail = () => {
  // const [query, setQuery] = useState("");
  const [isDark] = useContext(Themecontext);
  let params = useParams();
  let countryName = params.country;
  console.log("countryName", countryName);
  let [country, setCountry] = useState(null);
  const [notfound, setnotfound] = useState(false);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
      .then((res) => res.json())
      .then(([data]) => {
        // setCountryData({name:data.name.common,
        //     nativeName:Object.values(data.name.nativeName)[0].common
        // })
        setCountry({
          name: data.name.common,
          nativeName: Object.values(data.name.nativeName)[0].official || {},
          population: data.population,
          region: data.region,
          subregion: data.subregion,
          capital: data.capital[0],
          tld: data.tld,
          flags: data.flags.png,
          borders: [],
          language: Object.values(data.languages || {}).join(' , '),
          currencies: Object.values(data.currencies || {})
            .map((currency) => currency.name)
            .join(" ,"),
        });

        if (!data.borders) {
          data.borders = [];
        }

        Promise.all(
          data.borders.map((border) => {
            return fetch(`https://restcountries.com/v3.1/alpha/${border}`)
              .then((res) => res.json())
              .then(([borderCountry]) => borderCountry.name.common);
          })
        ).then((borders) => {
          setCountry((pre) => ({ ...pre, borders }));
        });
        console.log(data);
        // setcountriesData(data);
      })
      .catch(() => setnotfound(true));
  }, [countryName]);

  if (notfound) {
    return <h1>Country is not Found</h1>;
  }
  console.log(country);
  return country === null ? (
    <Loader />
  ) : (
    <main className={isDark ? "dark" : ""} >
      <div className="country-details-container">
        <Link to={"/"}>
          <span className="back-button">
            <i className="fa-solid fa-arrow-left"></i>&nbsp; Back
          </span>
        </Link>
        <div className="country-details">
          <img src={country.flags} />
          <div className="details-text-container">
            <h1>{country.name}</h1>
            <div className="details-text">
              <p>
                <b>Native Name: &nbsp; &nbsp; "{country.nativeName || country.name}" </b>
                <span className="native-name"></span>
              </p>
              <p>
                <b>
                  Population: {country.population?.toLocaleString("en-IN")}{" "}
                </b>
                <span className="population"></span>
              </p>
              <p>
                <b>Region: {country.region}</b>
                <span className="region"></span>
              </p>
              <p>
                <b>Sub Region: {country.subregion}</b>
                <span className="sub-region"></span>
              </p>
              <p>
                <b>Capital: {country.capital}</b>
                {/* <b>Capital: {country.capital.join(' ')}</b> */}
                <span className="capital"></span>
              </p>
              <p>
                <b>Top Level Domain: {country.tld}</b>
                <span className="top-level-domain"></span>
              </p>
              <p>
                <b>Currencies: {country.currencies}</b>
                <span className="currencies"></span>
              </p>
              <p>
                <b>Languages: {country.language}</b>
                <span className="languages"></span>
              </p>
            </div>
            <div className="border-countries">
              {country.borders.length !== 0 && (
                <div>
                  {" "}
                  <b>
                    {" "}
                    Countries Borders
                    {country.borders?.map((border) => {
                      console.log(border);
                      return (
                        <Link
                          key={border}
                          to={`/country/${border}`}
                          className="border-link"
                        >
                          {border}
                        </Link>
                      );
                    })}
                  </b>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CountryDetail;
