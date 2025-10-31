import React, { useEffect } from "react";
import "./styles/theme.css";
import "./styles/global.css";
import { NavBar } from "./components/NavBar";
import { NoteList } from "./components/NoteList";
import { NoteEditor } from "./components/NoteEditor";
import { NotesProvider, useNotes } from "./context/NotesContext";

const KeyboardShortcuts: React.FC = () => {
  const { createNote } = useNotes();
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "n") {
        e.preventDefault();
        createNote();
      }
      if (e.key.toLowerCase() === "n" && !e.ctrlKey && !e.metaKey && !e.altKey) {
        // hint only; not binding to avoid accidental triggers
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [createNote]);
  return null;
};

// PUBLIC_INTERFACE
export const AppContent: React.FC = () => {
  /** App shell content wrapped by provider. */
  return (
    <div className="container-app">
      <NavBar />
      <div className="app-shell" role="main">
        <NoteList />
        <div className="main-panel">
          <NoteEditor />
        </div>
      </div>
      <KeyboardShortcuts />
    </div>
  );
};

// PUBLIC_INTERFACE
function App() {
  /** Root App with NotesProvider context. */
  return (
    <NotesProvider>
      <AppContent />
    </NotesProvider>
  );
}

export default App;
