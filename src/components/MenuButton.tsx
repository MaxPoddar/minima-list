import { useState } from "react";
import "./MenuButton.css";

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
      >
        <span />
        <span />
        <span />
      </button>
    </div>
  );
}

export default MenuButton;
