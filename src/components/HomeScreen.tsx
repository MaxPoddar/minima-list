import DayBox from "./DayBox";
import "./HomeScreen.css";
import MenuButton from "./MenuButton";

const days = [
  { id: "mon", label: "M" },
  { id: "tue", label: "T" },
  { id: "wed", label: "W" },
  { id: "thu", label: "T" },
  { id: "fri", label: "F" },
  { id: "sat", label: "S" },
  { id: "sun", label: "S" },
] as const;

function HomeScreen() {
  return (
    <>
      <header className="menu-bar">
        <MenuButton />
      </header>
      <main className="main">
        {days.map((day) => (
          <DayBox key={day.id} label={day.label} />
        ))}
      </main>
    </>
  );
}
export default HomeScreen;
