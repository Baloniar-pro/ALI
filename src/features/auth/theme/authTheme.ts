export const authColors = {
  background: "#f5f7f6",
  surface: "#ffffff",
  primary: "#183b34",
  text: "#263b35",
  muted: "#66746f",
  icon: "#76857f",
  placeholder: "#9aa7a1",
  border: "#dce4df",
  soft: "#e8eeeb",
  divider: "#cbd5cf",
} as const;

export const authTypography = {
  brand: { fontSize: 15, fontWeight: "700" as const },
  title: { fontSize: 34, fontWeight: "800" as const, lineHeight: 40 },
  subtitle: { fontSize: 16, fontWeight: "400" as const },
  label: { fontSize: 14, fontWeight: "600" as const },
  input: { fontSize: 16, fontWeight: "400" as const },
  button: { fontSize: 16, fontWeight: "700" as const },
  link: { fontSize: 14, fontWeight: "700" as const },
  footer: { fontSize: 14, fontWeight: "400" as const },
} as const;