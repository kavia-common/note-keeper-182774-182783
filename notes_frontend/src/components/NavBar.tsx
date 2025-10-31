import React from "react";

// PUBLIC_INTERFACE
export const NavBar: React.FC = () => {
  /** Top navigation with logo and app title. */
  const publicUrl = (process.env.PUBLIC_URL || "").replace(/\/+$/, "");
  const logoSrc = `${publicUrl}/assets/logo.png`;

  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="nav-inner">
        <img
          src={logoSrc}
          alt="Notes Logo"
          width="28"
          height="28"
          style={{ borderRadius: 6, boxShadow: "var(--shadow-sm)" }}
        />
        <span className="nav-title">Ocean Notes</span>
        <div style={{ marginLeft: "auto", display: "flex", gap: 8, alignItems: "center" }}>
          <span className="badge" title="Last updated sort is active">Updated</span>
        </div>
      </div>
    </nav>
  );
};
