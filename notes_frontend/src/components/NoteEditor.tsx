import React, { useEffect, useMemo, useState } from "react";
import { useNotes } from "../context/NotesContext";
import { Button } from "./ui/Button";
import { EmptyState } from "./EmptyState";

// PUBLIC_INTERFACE
export const NoteEditor: React.FC = () => {
  /** Main editor for the selected note with validation and actions. */
  const { notes, selectedId, updateNote, deleteNote, confirmDelete, createNote } = useNotes();
  const note = useMemo(() => notes.find(n => n.id === selectedId) ?? null, [notes, selectedId]);
  const [title, setTitle] = useState(note?.title ?? "");
  const [content, setContent] = useState(note?.content ?? "");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setTitle(note?.title ?? "");
    setContent(note?.content ?? "");
    setError(null);
  }, [note?.id]);

  if (!note) {
    return (
      <div className="editor-card" role="region" aria-label="Note editor">
        <EmptyState onCreate={createNote} />
      </div>
    );
  }

  const handleSave = () => {
    const t = title.trim();
    if (t.length === 0) {
      setError("Title cannot be empty.");
      return;
    }
    updateNote(note.id, { title: t, content });
  };

  const handleDelete = async () => {
    const ok = await confirmDelete(note.id);
    if (ok) {
      deleteNote(note.id);
    }
  };

  const updated = new Date(note.updatedAt).toLocaleString();

  return (
    <div className="editor-card" role="region" aria-label="Note editor">
      <div>
        <label className="visually-hidden" htmlFor="note-title">Title</label>
        <input
          id="note-title"
          className="input"
          placeholder="Note title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          aria-invalid={!!error}
          aria-errormessage={error ? "title-error" : undefined}
        />
        {error && (
          <div id="title-error" style={{ color: "var(--color-error)", marginTop: 6 }}>{error}</div>
        )}
      </div>
      <div>
        <label className="visually-hidden" htmlFor="note-content">Content</label>
        <textarea
          id="note-content"
          className="textarea"
          placeholder="Write your note here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </div>
      <div className="editor-actions">
        <div style={{ color: "var(--color-muted)" }}>
          Last updated: <strong>{updated}</strong>
        </div>
        <div className="actions-right">
          <Button variant="danger" onClick={handleDelete} aria-label="Delete note">Delete</Button>
          <Button onClick={handleSave} aria-label="Save changes">Save</Button>
        </div>
      </div>
    </div>
  );
};
