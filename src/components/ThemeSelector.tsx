import { useRef } from "react";
import ThemeOption from "./ThemeOption";
import "./ThemeSelector.css";

const themes = [
  {
    theme: "light",
    mainColour: "#f8f0e3",
    accentColour: "#313131",
    label: "Light",
  },
  {
    theme: "dark",
    mainColour: "#313131",
    accentColour: "#f8f0e3",
    label: "Dark",
  },
  {
    theme: "black-yellow",
    mainColour: "#313131",
    accentColour: "#d6ba00",
    label: "Black yellow",
  },
  {
    theme: "blue-white",
    mainColour: "#26a0be",
    accentColour: "#f8f0e3",
    label: "Blue white",
  },
  {
    theme: "pink-white",
    mainColour: "#f8f0e3",
    accentColour: "#d61894",
    label: "Pink white",
  },
] as const;

function ThemeSelector() {
  const scrollRef = useRef<HTMLDivElement>(null);

  function scrollThemes(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -80 : 80,
      behavior: "smooth",
    });
  }

  return (
    <div className="outer">
      <button
        type="button"
        className="theme-scroll-button"
        aria-label="Scroll themes left"
        onClick={() => scrollThemes("left")}
      >
        ‹
      </button>

      <div ref={scrollRef} className="theme-options">
        {themes.map((item) => (
          <ThemeOption key={item.theme} {...item} />
        ))}
      </div>

      <button
        type="button"
        className="theme-scroll-button"
        aria-label="Scroll themes right"
        onClick={() => scrollThemes("right")}
      >
        ›
      </button>
    </div>
  );
}

export default ThemeSelector;
