import { setTheme, type Theme } from "../utils/theme";
import "./ThemeOption.css";

type ThemeOptionProps = {
  theme: Theme;
  mainColour: string;
  accentColour: string;
  label: string;
};

function ThemeOption({
  theme,
  mainColour,
  accentColour,
  label,
}: ThemeOptionProps) {
  return (
    <button
      type="button"
      className="theme-option"
      style={{
        background: `linear-gradient(
          105deg,
          ${mainColour} 0%,
          ${mainColour} 64%,
          ${accentColour} 68%,
          ${accentColour} 100%)`,
        border: `2px solid oklch(from ${accentColour} l 1 h)`,
      }}
      onClick={() => setTheme(theme)}
      aria-label={`Set ${label} theme`}
      title={label}
    />
  );
}

export default ThemeOption;
