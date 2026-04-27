/* src/components/common/StatusDot.jsx
   Props:
     color  - CSS color string
     pulse  - boolean, adds pulse animation
     size   - px number (default 6)
*/
import React from "react";

const StatusDot = ({ color, pulse = false, size = 6 }) => (
  <span
    className={pulse ? "dot-pulse" : ""}
    style={{
      display:      "inline-block",
      width:        size,
      height:       size,
      borderRadius: "50%",
      background:   color,
      flexShrink:   0,
    }}
  />
);

export default StatusDot;
