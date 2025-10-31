import React from "react";
import { type Note } from "../lib/storage";

type Props = {
  note: Note;
  active: boolean;
  onSelect: (id: string) => void;
};

// PUBLIC_INTERFACE
export const NoteItem: React.FC<Props> = ({ note, active, onSelect }) => {
  /** Single note item for the list, keyboard navigable. */
  const handleKey = (e: React.KeyboardEvent<HTMLLIElement>) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(note.id);
    }
  };
  const updated = new Date(note.updatedAt).toLocaleString();
  return (
    <li
      className={`note-item ${active ? "active" : ""}`}
      onClick={() => onSelect(note.id)}
      onKeyDown={handleKey}
      tabIndex={0}
      role="button"
      aria-pressed={active}
      aria-label={`Select note: ${note.title}`}
    >
      <div className="note-title">{note.title || "Untitled"}</div>
      <div className="note-meta">
        <span title={updated}>Updated</span>
        <span>{new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit", month: "short", day: "2-digit" }).format(note.updatedAt)}</span>
      </div>
    </li>
  );
};
