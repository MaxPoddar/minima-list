import {
  KeyboardEvent,
  TextareaHTMLAttributes,
  useLayoutEffect,
  useRef,
} from "react";
import "./DayList.css";

export type ListItem = {
  id: string;
  text: string;
  done: boolean;
};

type DayListProps = {
  items: ListItem[];
  onItemsChange: (items: ListItem[]) => void;
};

function createId() {
  return crypto.randomUUID();
}

function resizeTextarea(element: HTMLTextAreaElement) {
  element.style.height = "auto";
  element.style.height = `${element.scrollHeight}px`;
}

type AutoResizeTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

function AutoResizeTextarea({ value, onInput, ...props }: AutoResizeTextareaProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useLayoutEffect(() => {
    if (textareaRef.current) {
      resizeTextarea(textareaRef.current);
    }
  }, [value]);

  return (
    <textarea
      {...props}
      ref={textareaRef}
      value={value}
      onInput={(event) => {
        resizeTextarea(event.currentTarget);
        onInput?.(event);
      }}
    />
  );
}

function DayList({ items, onItemsChange }: DayListProps) {
  function addItem(text: string) {
    const trimmed = text.trim();

    if (!trimmed) {
      return;
    }

    onItemsChange([...items, { id: createId(), text: trimmed, done: false }]);
  }

  function updateItemText(id: string, text: string) {
    onItemsChange(
      items.map((item) => (item.id === id ? { ...item, text } : item)),
    );
  }

  function toggleItem(id: string) {
    onItemsChange(
      items.map((item) =>
        item.id === id ? { ...item, done: !item.done } : item,
      ),
    );
  }

  function deleteEmptyItem(id: string) {
    onItemsChange(items.filter((item) => item.id !== id || item.text.trim()));
  }

  function handleDraftKeyDown(event: KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();

      const text = event.currentTarget.value;
      addItem(text);
      event.currentTarget.value = "";
      resizeTextarea(event.currentTarget);
    }
  }

  return (
    <div className="list">
      <ul className="list-items">
        {items.map((item) => (
          <li className={`list-item ${item.done ? "done" : ""}`} key={item.id}>
            <span className="list-bullet">-</span>

            <AutoResizeTextarea
              className="list-text-input"
              value={item.text}
              onChange={(event) => updateItemText(item.id, event.target.value)}
              onBlur={() => deleteEmptyItem(item.id)}
              aria-label="List item"
              rows={1}
            />

            <input
              className="list-checkbox"
              type="checkbox"
              checked={item.done}
              onChange={() => toggleItem(item.id)}
              aria-label={`Mark ${item.text} complete`}
            />
          </li>
        ))}

        <li className="list-item new-item">
          <span className="list-bullet">-</span>

          <AutoResizeTextarea
            className="list-text-input"
            value={undefined}
            onInput={(event) => resizeTextarea(event.currentTarget)}
            onBlur={(event) => {
              addItem(event.currentTarget.value);
              event.currentTarget.value = "";
              resizeTextarea(event.currentTarget);
            }}
            onKeyDown={handleDraftKeyDown}
            placeholder="New item"
            aria-label="New list item"
            rows={1}
          />

          <span className="checkbox-placeholder" />
        </li>
      </ul>
    </div>
  );
}

export default DayList;
