import React, { useContext } from "react";
import { Themecontext } from "../Context/themecontext";

const Header = () => {
  let theme = useContext(Themecontext);
  let [isDark, setIsDark] = theme;
  return (
    <header className={`header-container ${isDark ? "dark" : ""}`}>
      <div className="header-content">
        <h2 className="title">Where in the world?</h2>
        <p
          onClick={() => {
            setIsDark(!isDark);
            localStorage.setItem("isDarkMode", !isDark);
          }}
        >
          <i className="fa-regular fa-moon"></i>&nbsp;&nbsp;Dark Mode
        </p>
      </div>
    </header>
  );
};

export default Header;
