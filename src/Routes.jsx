import React, { useContext, useState } from "react";
import SearchBar from "./components/SearchBar";
import SelectMenu from "./components/SelectMenu";
import CountriesList from "./components/CountriesContainer";
import { Themecontext } from "./Context/themecontext";

const Index = () => {
  const [query, setQuery] = useState("");
  const [isDark] = useContext(Themecontext);

  return (
    <main className={isDark ? "dark" : ""}>
      <div className="search-filter-container">
        <SearchBar setQuery={setQuery} />
        <SelectMenu setQuery={setQuery}/>
      </div>
      <CountriesList query={query} />
    </main>
  );
};

export default Index;
