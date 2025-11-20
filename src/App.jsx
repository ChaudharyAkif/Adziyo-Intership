import "./App.css";
import SearchBar from "./components/SearchBar";
import SelectMenu from "./components/SelectMenu";
import CountriesList from "./components/CountriesContainer";

import Header from "./components/Header";
import { Route, Routes } from "react-router-dom";
import Index from "./Routes";
import CountryDetail from "./components/CountryDetail";
import { Theme } from "./Context/themecontext";
function App() {
  return (
    <>
      <Theme>
        <Header />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="country/:country" element={<CountryDetail />} />
            <Route path="*" element={<Error />} />
          </Routes>
      </Theme>
    </>
  );
}
export default App;
