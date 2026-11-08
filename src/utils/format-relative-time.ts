export function formatRelativeTime({
  then,
  now = new Date(),
}: {
  then: Date;
  now?: Date;
}): string {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  // Ordered largest to smallest; values are approximate seconds per unit.
  const UNITS: [Intl.RelativeTimeFormatUnit, number][] = [
    ["year", 31_536_000],
    ["month", 2_592_000],
    ["week", 604_800],
    ["day", 86_400],
    ["hour", 3_600],
    ["minute", 60],
  ];

  const seconds = Math.round((then.getTime() - now.getTime()) / 1000);

  for (const [unit, secondsInUnit] of UNITS) {
    if (Math.abs(seconds) >= secondsInUnit) {
      return rtf.format(Math.trunc(seconds / secondsInUnit), unit);
    }
  }

  return "just now";
}
