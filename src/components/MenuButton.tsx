import { useState } from "react";
import "./MenuButton.css";
import ThemeSelector from "./ThemeSelector";

function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="menu">
      <button
        type="button"
        className={`menu-button ${isOpen ? "open" : ""}`}
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls="menu-panel"
      >
        <span />
        <span />
        <span />
      </button>

      {isOpen && (
        <div id="menu-panel" className="menu-panel">
          <span style={{ height: `3rem` }} />
          <ThemeSelector />
          <button type="button" className="clear">
            Clear
          </button>
        </div>
      )}
    </div>
  );
}

export default MenuButton;
