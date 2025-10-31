import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { createEmptyNote, loadNotes, saveNotes, type Note } from "../lib/storage";

// Types for context value
type Toast = { id: string; message: string; type?: "info" | "error" };
type NotesContextValue = {
  notes: Note[];
  filteredNotes: Note[];
  query: string;
  setQuery: (q: string) => void;
  selectedId: string | null;
  selectNote: (id: string | null) => void;
  createNote: () => void;
  updateNote: (id: string, patch: Partial<Pick<Note, "title" | "content">>) => void;
  deleteNote: (id: string) => void;
  confirmDelete: (id: string) => Promise<boolean>;
  sortBy: "updatedAt";
  toasts: Toast[];
  dismissToast: (id: string) => void;
};

const NotesContext = createContext<NotesContextValue | undefined>(undefined);

// PUBLIC_INTERFACE
export const useNotes = (): NotesContextValue => {
  /** Hook to access the NotesContext */
  const ctx = useContext(NotesContext);
  if (!ctx) throw new Error("useNotes must be used within NotesProvider");
  return ctx;
};

// PUBLIC_INTERFACE
export const NotesProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  /** Provider managing notes state and persistence with localStorage. */
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [query, setQuery] = useState("");
  const [toasts, setToasts] = useState<Toast[]>([]);

  // initial load
  useEffect(() => {
    const loaded = loadNotes();
    setNotes(loaded);
    setSelectedId(loaded[0]?.id ?? null);
  }, []);

  // persist on changes
  useEffect(() => {
    saveNotes(notes);
  }, [notes]);

  const showToast = (message: string, type: "info" | "error" = "info") => {
    const id = Math.random().toString(36).slice(2);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  const selectNote = (id: string | null) => {
    setSelectedId(id);
  };

  const createNote = () => {
    const n = createEmptyNote();
    setNotes(prev => [n, ...prev]);
    setSelectedId(n.id);
    showToast("New note created");
  };

  const updateNote = (id: string, patch: Partial<Pick<Note, "title" | "content">>) => {
    setNotes(prev =>
      prev
        .map(n => (n.id === id ? { ...n, ...patch, updatedAt: Date.now() } : n))
        .sort((a, b) => b.updatedAt - a.updatedAt)
    );
  };

  const deleteNote = (id: string) => {
    setNotes(prev => prev.filter(n => n.id !== id));
    if (selectedId === id) {
      setSelectedId(prev => {
        const remaining = notes.filter(n => n.id !== id);
        return remaining[0]?.id ?? null;
      });
    }
    showToast("Note deleted");
  };

  const confirmDelete = (id: string) => {
    return new Promise<boolean>((resolve) => {
      const ok = window.confirm("Delete this note? This cannot be undone.");
      if (!ok) {
        showToast("Delete canceled");
        resolve(false);
      } else {
        resolve(true);
      }
    });
  };

  const filteredNotes = useMemo(() => {
    const q = query.trim().toLowerCase();
    const arr = q.length === 0
      ? notes
      : notes.filter(n =>
          n.title.toLowerCase().includes(q) ||
          n.content.toLowerCase().includes(q)
        );
    return [...arr].sort((a, b) => b.updatedAt - a.updatedAt);
  }, [notes, query]);

  const value: NotesContextValue = {
    notes,
    filteredNotes,
    query,
    setQuery,
    selectedId,
    selectNote,
    createNote,
    updateNote,
    deleteNote,
    confirmDelete,
    sortBy: "updatedAt",
    toasts,
    dismissToast
  };

  return (
    <NotesContext.Provider value={value}>
      {children}
      <div aria-live="polite" aria-atomic="true">
        {toasts.map(t => (
          <div key={t.id} className={`toast ${t.type === "error" ? "error" : ""}`} role="status">
            <span className="badge">{t.type === "error" ? "Error" : "Info"}</span>
            <span>{t.message}</span>
            <button className="btn btn-ghost" aria-label="Dismiss notification" onClick={() => dismissToast(t.id)}>✕</button>
          </div>
        ))}
      </div>
    </NotesContext.Provider>
  );
};
