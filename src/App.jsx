import Header from "./components/Header";
import "./App.css";
import SearchBar from "./components/SearchBar";
import SelectMenu from "./components/SelectMenu";
import CountriesList from "./components/CountriesContainer";
import { useState } from "react";
function App() {
  let [query, setQuery] = useState("");

  return (
    <>
      <Header />
      <main>
        <div className="search-filter-container">
          <SearchBar setQuery={setQuery} />
          <SelectMenu />
        </div>
        <CountriesList query={query} />
      </main>
    </>
  );
}

export default App;
