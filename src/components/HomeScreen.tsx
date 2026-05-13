import { useState, useMemo, useEffect } from "react";
import DayBox from "./DayBox";
import "./HomeScreen.css";
import MenuButton from "./MenuButton";
import DayList, { ListItem } from "./DayList";

const STORAGE_KEY = "minima-list.week-notes";

const days = [
  { id: "Monday", label: "M" },
  { id: "Tuesday", label: "T" },
  { id: "Wednesday", label: "W" },
  { id: "Thursday", label: "T" },
  { id: "Friday", label: "F" },
  { id: "Saturday", label: "S" },
  { id: "Sunday", label: "S" },
] as const;

type Day = (typeof days)[number];
type DayID = Day["id"];
type WeekNotes = Record<DayID, ListItem[]>;

function createEmptyWeek(): WeekNotes {
  return {
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: [],
  };
}

function loadWeekNotes(): WeekNotes {
  const emptyWeek = createEmptyWeek();
  const saved = localStorage.getItem(STORAGE_KEY);

  if (!saved) {
    return emptyWeek;
  }

  try {
    return { ...emptyWeek, ...JSON.parse(saved) };
  } catch {
    return emptyWeek;
  }
}

function HomeScreen() {
  const [selectedDay, setSelectedDay] = useState<(typeof days)[number] | null>(
    null,
  );
  const [notes, setNotes] = useState<WeekNotes>(() => loadWeekNotes());

  const completedDays = useMemo(() => {
    return new Set(
      days
        .filter((day) => {
          const items = notes[day.id];
          return items.length > 0 && items.every((item) => item.done);
        })
        .map((day) => day.id),
    );
  }, [notes]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  function updateSelectedDayItems(items: ListItem[]) {
    if (!selectedDay) {
      return;
    }

    setNotes((prev) => ({
      ...prev,
      [selectedDay.id]: items,
    }));
  }

  function clearWeek() {
    setNotes(createEmptyWeek());
  }

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
          <MenuButton onClearAll={clearWeek} />
        </div>
      </header>

      <main className={`main ${selectedDay ? "day-expanded" : ""}`}>
        <div className="day-grid">
          {days.map((day) => (
            <DayBox
              key={day.id}
              label={day.label}
              completed={completedDays.has(day.id)}
              onClick={() => setSelectedDay(day)}
            />
          ))}
        </div>

        {selectedDay && (
          <div className="day-panel" aria-label={`${selectedDay.id} list`}>
            <h1 className="day">{selectedDay.id}</h1>
            <DayList
              items={notes[selectedDay.id]}
              onItemsChange={updateSelectedDayItems}
            />
          </div>
        )}
      </main>
    </>
  );
}
export default HomeScreen;
