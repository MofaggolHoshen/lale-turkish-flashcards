export const C = {
  paper: "#F2F6F5",
  paperDeep: "#E7EFEE",
  ink: "#132A33",
  inkSoft: "#3E5A62",
  cobalt: "#0F4C5C",
  cobaltDeep: "#0A3745",
  turquoise: "#2E9C97",
  coral: "#D2492F",
  gold: "#C9A24B",
  line: "#CFDBDA",
};

export const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: 8,
  border: `1px solid ${C.line}`,
  fontSize: 14.5,
  outline: "none",
  boxSizing: "border-box",
  background: "#fff",
};

export function btnStyle(bg, fg, disabled) {
  return {
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    opacity: disabled ? 0.5 : 1,
    background: bg,
    color: fg,
    padding: "10px 16px",
    borderRadius: 9,
    fontWeight: 700,
    fontSize: 14,
  };
}
