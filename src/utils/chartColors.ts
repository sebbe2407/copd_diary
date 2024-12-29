export function getSprayBarColor(value: number): string {
  if (value <= 3) return '#86efac'; // Light green
  if (value <= 6) return '#fdba74'; // Light orange
  return '#fca5a5'; // Light red
}