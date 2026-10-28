export type RoiInput = { invoices: number; minutesPerInvoice: number; hourlyRate: number };

export const PRESETS = [
  { id: "small", label: "Despacho Pequeño", invoices: 200, minutesPerInvoice: 2.5, hourlyRate: 20 },
  { id: "medium", label: "Despacho Medio", invoices: 1200, minutesPerInvoice: 3.5, hourlyRate: 24 },
  { id: "large", label: "Gran Asesoría", invoices: 4000, minutesPerInvoice: 4.0, hourlyRate: 28 },
  { id: "corp", label: "Corporativo", invoices: 8000, minutesPerInvoice: 4.5, hourlyRate: 32 },
] as const;

export const DEFAULT_INPUT: RoiInput = { invoices: 1200, minutesPerInvoice: 3.5, hourlyRate: 24 };

export function computeRoi({ invoices, minutesPerInvoice, hourlyRate }: RoiInput) {
  const totalHoursManual = Math.round((invoices * minutesPerInvoice) / 60);
  const rawHoursSaved = Math.round(totalHoursManual * (57 / 70));
  const rawDaysSaved = Math.round((rawHoursSaved / 8) * 10) / 10;
  const rawMonthlySavings = Math.round(rawHoursSaved * hourlyRate);
  const rawAnnualSavings = rawMonthlySavings * 12;
  return { totalHoursManual, rawHoursSaved, rawDaysSaved, rawMonthlySavings, rawAnnualSavings };
}
