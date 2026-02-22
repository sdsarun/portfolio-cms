export function toPositiveInt(value: string | string[] | undefined, fallback: number): number {
  const raw = Array.isArray(value) ? value[0] : value;
  if (!raw) {
    return fallback;
  }

  const parsed = Number(raw);
  if (!Number.isInteger(parsed) || parsed < 1) {
    return fallback;
  }

  return parsed;
}
