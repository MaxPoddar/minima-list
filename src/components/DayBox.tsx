import "./DayBox.css";

type DayBoxProps = {
  label: string;
};

function DayBox({ label }: DayBoxProps) {
  return (
    <button className="day-box" type="button" aria-label={label}>
      {label}
    </button>
  );
}

export default DayBox;
