export default function parseDate(
  dateString: string | undefined,
): string | null {
  if (!dateString) return null;
  const date = new Date(dateString);
  return isNaN(date.getTime()) ? null : date.toISOString();
}
