import "./DayBox.css";

type DayBoxProps = {
  label: string;
  onClick: () => void;
};

function DayBox({ label, onClick }: DayBoxProps) {
  return (
    <button
      className="day-box"
      type="button"
      aria-label={`Open ${label}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default DayBox;
