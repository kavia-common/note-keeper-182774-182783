import React from "react";

// PUBLIC_INTERFACE
export const EmptyState: React.FC<{ onCreate: () => void }> = ({ onCreate }) => {
  /** Empty state prompting to create the first note. */
  const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  const logoSrc = `${publicUrl}/assets/logo.png`;

  return (
    <div className="empty-state" role="status" aria-live="polite">
      <img src={logoSrc} alt="" width="54" height="54" style={{ opacity: 0.8, borderRadius: 10 }} />
      <h2 style={{ margin: "12px 0 8px" }}>No note selected</h2>
      <p style={{ margin: 0, color: "var(--color-muted)" }}>Create a new note to get started.</p>
      <div style={{ marginTop: 16 }}>
        <button className="btn btn-primary" onClick={onCreate}>+ New note</button>
      </div>
    </div>
  );
};
