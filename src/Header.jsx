import { useState, useEffect, useContext, useReducer } from "react";
import { NavLink, Link, useLocation } from "react-router-dom";
import { useContent } from "./ContentContext";
import { useThemeDispatch, useTheme } from "./ThemeContext";
import { isMobile, BrowserView, MobileView } from "react-device-detect";

import "./scss/Header.scss";

import mineduc_logo from "./assets/mineduc_logo.svg";
import menu_icon from "./assets/menu.svg";
import larger from "./assets/larger.svg";
import smaller from "./assets/smaller.svg";
import toggleTheme from "./assets/toggleTheme.svg";

function Header() {
  const theme = useTheme();
  console.log(theme, "theme");
  const dispatch = useThemeDispatch();
  const [open, setOpen] = useState(false);
  const content = useContent();
  const location = useLocation();

  function handleSwitchMode() {
    dispatch({
      type: "switch",
      darkTheme: !theme.darkTheme,
    });
  }

  useEffect(() => {
    setOpen(false);
  }, [location]);

  function handleFontSize(size) {
    dispatch({
      type: size === -1 ? "decrease" : "increase",
      fontSize: theme.fontSize + size,
    });
  }

  return (
    <header>
      <div className="preheader">
        <div className="preheader-wrapper">
          <nav className="mainmenu">
            <Link to="/">
              <img
                className="mineduc_logo"
                src={mineduc_logo}
                alt="Ministerio de Educación"
              />
            </Link>
            <div className="acc">
              <button
                onClick={handleSwitchMode}
                title={theme.darkTheme ? "Modo claro" : "Modo oscuro"}
              >
                <img
                  src={toggleTheme}
                  alt={`Cambiar a ${
                    theme.darkTheme ? "modo claro" : "modo oscuro"
                  }`}
                />
              </button>
              <button
                title="Disminuir tamaño de letra"
                onClick={() => handleFontSize(-1)}
              >
                <img src={smaller} alt="Disminuir tamaño de letra" />
              </button>
              <button
                title="Aumentar tamaño de letra"
                onClick={() => handleFontSize(1)}
              >
                <img src={larger} alt="Aumentar tamaño de letra" />
              </button>
            </div>
            {isMobile && (
              <span className="menu_icon" onClick={() => setOpen(!open)}>
                <img src={menu_icon} alt="Ver menú" />
              </span>
            )}
            <BrowserView className="desktop-menu-wrapper">
              <ul className="menu">
                <li>
                  <a onClick={() => setOpen(!open)}>
                    Información por estamento
                  </a>
                  <ul>
                    {content &&
                      open &&
                      content.textcontent.sections.map((section) => (
                        <li>
                          <NavLink
                            activeClassName="active"
                            title={section.title}
                            to={section.url}
                          >
                            {section.title}
                          </NavLink>
                        </li>
                      ))}
                  </ul>
                </li>
                <li>
                  <NavLink
                    activeclassname="active"
                    to="caracterizacion-establecimientos"
                    title="Caracterización de establecimientos"
                  >
                    Caracterización de establecimientos
                  </NavLink>
                </li>
              </ul>
            </BrowserView>
            {open && (
              <MobileView className="mobile-menu-wrapper">
                <ul className="menu menu_mobile">
                  <li className="section-menu-item">
                    Información por estamento
                  </li>
                  {content &&
                    content.textcontent.sections.map((section) => (
                      <li>
                        <NavLink
                          activeclassname="active"
                          title={section.title}
                          to={section.url}
                        >
                          {section.title}
                        </NavLink>
                      </li>
                    ))}

                  <li>
                    <NavLink
                      activeclassname="active"
                      to="caracterizacion-establecimientos"
                      title="Caracterización de establecimientos"
                    >
                      Caracterización de establecimientos
                    </NavLink>
                  </li>
                </ul>
              </MobileView>
            )}
          </nav>
        </div>
      </div>
      <div className="mainheader">
        <div className="content-wrapper">
          <h1>{content?.textcontent?.site_title}</h1>
        </div>
      </div>
    </header>
  );
}

export default Header;
