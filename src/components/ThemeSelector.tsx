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
    label: "Blue light",
  },
] as const;

function ThemeSelector() {
  return (
    <div className="outer">
      <div className="theme-options">
        {themes.map((item) => (
          <ThemeOption key={item.theme} {...item} />
        ))}
      </div>
    </div>
  );
}

export default ThemeSelector;
