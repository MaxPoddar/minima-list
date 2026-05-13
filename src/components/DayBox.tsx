import "./DayBox.css";

type DayBoxProps = {
  label: string;
  completed: boolean;
  onClick: () => void;
};

function DayBox({ label, completed, onClick }: DayBoxProps) {
  return (
    <button
      className={`day-box ${completed ? "completed" : ""}`}
      type="button"
      aria-label={`Open ${label}`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}

export default DayBox;
