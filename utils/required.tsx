// utils/required.tsx
import React from "react";

export const Required = ({ text = "Required" }: { text?: string }) => (
  <span style={{ color: "red", marginLeft: 4 }}>{text}</span>
);
export default Required;
