import { useState } from "react";
import DayBox from "./DayBox";
import "./HomeScreen.css";
import MenuButton from "./MenuButton";

const days = [
  { id: "Monday", label: "M" },
  { id: "Tuesday", label: "T" },
  { id: "Wednesday", label: "W" },
  { id: "Thursday", label: "T" },
  { id: "Friday", label: "F" },
  { id: "Saturday", label: "S" },
  { id: "Sunday", label: "S" },
] as const;

function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState<(typeof days)[number] | null>(
    null,
  );
  return (
    <>
      <header className="menu-bar">
        {selectedDay && (
          <button
            type="button"
            className="return-home"
            aria-label="return home"
            onClick={() => setSelectedDay(null)}
          >
            ←
          </button>
        )}
        <div className={selectedDay ? "menu-disabled" : ""}>
          <MenuButton />
        </div>
      </header>

      <main className={`main ${selectedDay ? "day-expanded" : ""}`}>
        <div className="day-grid">
          {days.map((day) => (
            <DayBox
              key={day.id}
              label={day.label}
              onClick={() => setSelectedDay(day)}
            />
          ))}
        </div>

        {selectedDay && (
          <div className="day-panel" aria-label={`${selectedDay.id} list`}>
            <h1 className="day">{selectedDay?.id}</h1>
          </div>
        )}
      </main>
    </>
  );
}
export default HomeScreen;
