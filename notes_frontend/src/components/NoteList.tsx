import React, { useRef } from "react";
import { useNotes } from "../context/NotesContext";
import { Input } from "./ui/Input";
import { Button } from "./ui/Button";
import { NoteItem } from "./NoteItem";

// PUBLIC_INTERFACE
export const NoteList: React.FC = () => {
  /** Sidebar listing notes with search and add button. */
  const { filteredNotes, query, setQuery, createNote, selectedId, selectNote } = useNotes();
  const searchRef = useRef<HTMLInputElement>(null);

  return (
    <aside className="sidebar" aria-label="Notes list">
      <div className="sidebar-header">
        <Input
          ref={searchRef as any}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search notes…"
          aria-label="Search notes"
          className="search-input"
        />
        <Button aria-label="Create new note" title="Create new note (N)" onClick={createNote}>+ New</Button>
      </div>
      <ul className="note-list" role="list" aria-label="Notes">
        {filteredNotes.map(n => (
          <NoteItem
            key={n.id}
            note={n}
            active={selectedId === n.id}
            onSelect={selectNote}
          />
        ))}
        {filteredNotes.length === 0 && (
          <li className="empty-state" role="status" aria-live="polite">No notes found</li>
        )}
      </ul>
    </aside>
  );
};
