/* src/components/Sidebar/NavIcon.jsx */
import React from "react";

const paths = {
  overview: (
    <>
      <rect x="1" y="1" width="6" height="6" rx="1" />
      <rect x="9" y="1" width="6" height="6" rx="1" />
      <rect x="1" y="9" width="6" height="6" rx="1" />
      <rect x="9" y="9" width="6" height="6" rx="1" />
    </>
  ),
  analytics: (
    <path d="M1 14L5 8l3 4 3-6 3 2" strokeLinecap="round" strokeLinejoin="round" />
  ),
  watchlist: (
    <>
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3l2 2" strokeLinecap="round" />
    </>
  ),
  apikeys: (
    <>
      <circle cx="6" cy="8" r="3" />
      <path d="M9 8h6M13 6v4" strokeLinecap="round" />
    </>
  ),
  settings: (
    <>
      <circle cx="8" cy="8" r="2.5" />
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.42 1.42M11.53 11.53l1.42 1.42M3.05 12.95l1.42-1.42M11.53 4.47l1.42-1.42" strokeLinecap="round" />
    </>
  ),
};

const NavIcon = ({ id }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
    stroke="currentColor" strokeWidth="1.2"
    style={{ opacity: 0.8, flexShrink: 0 }}>
    {paths[id]}
  </svg>
);

export default NavIcon;
