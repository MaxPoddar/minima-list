import { useState } from "react";
import "./MenuButton.css";
import ThemeSelector from "./ThemeSelector";

function MenuButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isConfirmingClear, setIsConfirmingClear] = useState(false);

  return (
    <div className={`menu ${isOpen ? "open" : ""}`}>
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
      <div className="menu-panel">
        <ThemeSelector />

        <div
          className={`clear-action ${isConfirmingClear ? "confirming" : ""}`}
        >
          <button
            type="button"
            className="clear"
            onClick={() => setIsConfirmingClear((prev) => !prev)}
            aria-expanded={isConfirmingClear}
          >
            Clear
          </button>

          <div className="clear-confirm" aria-hidden={!isConfirmingClear}>
            <button
              type="button"
              className="clear-confirm-button cancel"
              aria-label="Cancel clear"
              onClick={() => setIsConfirmingClear(false)}
            >
              ✕
            </button>

            <span className="clear-confirm-divider" aria-hidden="true">
              |
            </span>

            <button
              type="button"
              className="clear-confirm-button confirm"
              aria-label="Confirm clear"
              onClick={() => {
                // later: clear week notes here
                setIsConfirmingClear(false);
              }}
            >
              ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuButton;
