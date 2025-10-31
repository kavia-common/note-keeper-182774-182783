import React from "react";
import logoUrl from "../assets/logo.png";

// PUBLIC_INTERFACE
export const NavBar: React.FC = () => {
  /** Top navigation with logo and app title. Uses bundled logo asset for reliable pathing. */
  return (
    <nav className="navbar" role="navigation" aria-label="Top Navigation">
      <div className="nav-inner">
        <img
          src={logoUrl}
          alt="Ocean Notes logo"
          width={28}
          height={28}
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
