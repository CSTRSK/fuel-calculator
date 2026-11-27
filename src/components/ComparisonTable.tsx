import type { TranslationDictionary } from '../data/translations';
import type {
  CalculationResult,
  CurrencyCode,
  Locale,
  UnitSystem,
} from '../types/calculator';
import {
  formatCurrency,
  formatDuration,
  formatNumber,
} from '../utils/calculations';

interface ComparisonTableProps {
  t: TranslationDictionary;
  result: CalculationResult;
  locale: Locale;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
}

export function ComparisonTable({
  t,
  result,
  locale,
  unitSystem,
  currency,
}: ComparisonTableProps) {
  if (!result.isValid) {
    return null;
  }

  const isMetric = unitSystem === 'metric';
  const speedUnit = isMetric ? t.unitSpeedMetric : t.unitSpeedImperial;
  const consUnit = isMetric ? t.unitConsMetric : t.unitConsImperial;
  const volUnit = isMetric ? t.unitVolumeMetric : t.unitVolumeImperial;
  const co2Unit = isMetric ? t.unitCo2Metric : t.unitCo2Imperial;

  const formatSigned = (val: number, decimals: number, unit: string) => {
    if (Math.abs(val) < 0.005) return `0 ${unit}`;
    const sign = val > 0 ? '+' : '−';
    return `${sign}${formatNumber(Math.abs(val), locale, decimals, decimals)} ${unit}`;
  };

  const timeDeltaText =
    Math.abs(result.timeDiffHours) < 0.0005
      ? '0'
      : `${result.timeDiffHours > 0 ? '−' : '+'}${formatDuration(
          Math.abs(result.timeDiffHours),
          t.unitHourShort,
          t.unitMinShort
        )} (${result.timeDiffHours > 0 ? '−' : '+'}${formatNumber(
          Math.abs(result.timeDiffPercent),
          locale,
          1,
          1
        )}%)`;

  const consDiff = result.cons2Display - result.cons1Display;

  const rows = [
    {
      label: t.rowTravelTime,
      v1: formatDuration(result.time1Hours, t.unitHourShort, t.unitMinShort),
      v2: formatDuration(result.time2Hours, t.unitHourShort, t.unitMinShort),
      diff: timeDeltaText,
      diffTone:
        result.timeDiffHours > 0.0005
          ? 'positive'
          : result.timeDiffHours < -0.0005
            ? 'negative'
            : 'neutral',
    },
    {
      label: t.rowConsumptionRate,
      v1: `${formatNumber(result.cons1Display, locale, 1, 1)} ${consUnit}`,
      v2: `${formatNumber(result.cons2Display, locale, 1, 1)} ${consUnit}`,
      diff: formatSigned(consDiff, 1, consUnit),
      // In metric, higher L/100km is worse; in imperial, higher MPG is better
      diffTone:
        Math.abs(consDiff) < 0.05
          ? 'neutral'
          : isMetric
            ? consDiff > 0
              ? 'negative'
              : 'positive'
            : consDiff > 0
              ? 'positive'
              : 'negative',
    },
    {
      label: t.rowTotalFuel,
      v1: `${formatNumber(result.fuel1Display, locale, 2, 2)} ${volUnit}`,
      v2: `${formatNumber(result.fuel2Display, locale, 2, 2)} ${volUnit}`,
      diff: `${formatSigned(result.fuelDiffDisplay, 2, volUnit)} (${
        result.fuelDiffPercent >= 0 ? '+' : '−'
      }${formatNumber(Math.abs(result.fuelDiffPercent), locale, 1, 1)}%)`,
      diffTone:
        result.fuelDiffDisplay < -0.005
          ? 'positive'
          : result.fuelDiffDisplay > 0.005
            ? 'negative'
            : 'neutral',
    },
    {
      label: t.rowTotalCost,
      v1: formatCurrency(result.cost1, locale, currency),
      v2: formatCurrency(result.cost2, locale, currency),
      diff: formatCurrency(result.costDiff, locale, currency, true),
      diffTone:
        result.costDiff < -0.005
          ? 'positive'
          : result.costDiff > 0.005
            ? 'negative'
            : 'neutral',
    },
    {
      label: t.rowCo2Emissions,
      v1: `${formatNumber(result.co2_1Display, locale, 2, 2)} ${co2Unit}`,
      v2: `${formatNumber(result.co2_2Display, locale, 2, 2)} ${co2Unit}`,
      diff: `${formatSigned(result.co2DiffDisplay, 2, co2Unit)} (${
        result.co2DiffPercent >= 0 ? '+' : '−'
      }${formatNumber(Math.abs(result.co2DiffPercent), locale, 1, 1)}%)`,
      diffTone:
        result.co2DiffDisplay < -0.005
          ? 'positive'
          : result.co2DiffDisplay > 0.005
            ? 'negative'
            : 'neutral',
    },
  ] as const;

  return (
    <section
      id="comparison-section"
      aria-labelledby="comparison-heading"
      className="rounded border border-[#dfe1e2] bg-white p-6 dark:border-[#2e3846] dark:bg-[#1b222c]"
    >
      <h2
        id="comparison-heading"
        className="text-xl font-bold text-[#162e51] dark:text-[#f0f4f8]"
      >
        {t.tableTitle}
      </h2>

      <div className="mt-4 overflow-x-auto">
        <table className="w-full min-w-[520px] border-collapse text-left text-sm">
          <caption className="sr-only">{t.tableCaption}</caption>
          <thead>
            <tr className="border-b-2 border-[#1b1b1b] bg-[#f0f0f0] dark:border-[#73859c] dark:bg-[#11161d]">
              <th
                scope="col"
                className="px-3 py-3 font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.tableColMetric}
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-right font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.tableColSpeed1} (
                <span className="font-mono tabular-nums">
                  {formatNumber(result.speed1Display, locale, 0, 1)} {speedUnit}
                </span>
                )
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-right font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.tableColSpeed2} (
                <span className="font-mono tabular-nums">
                  {formatNumber(result.speed2Display, locale, 0, 1)} {speedUnit}
                </span>
                )
              </th>
              <th
                scope="col"
                className="px-3 py-3 text-right font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.tableColDiff}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#dfe1e2] dark:divide-[#2e3846]">
            {rows.map((row) => (
              <tr
                key={row.label}
                className="hover:bg-[#f8f9fa] dark:hover:bg-[#171e27]"
              >
                <th
                  scope="row"
                  className="px-3 py-3 font-semibold text-[#1b1b1b] dark:text-[#e2e8f0]"
                >
                  {row.label}
                </th>
                <td className="px-3 py-3 text-right font-mono tabular-nums text-[#1b1b1b] dark:text-[#e2e8f0]">
                  {row.v1}
                </td>
                <td className="px-3 py-3 text-right font-mono tabular-nums text-[#1b1b1b] dark:text-[#e2e8f0]">
                  {row.v2}
                </td>
                <td
                  className={`px-3 py-3 text-right font-mono font-semibold tabular-nums ${
                    row.diffTone === 'positive'
                      ? 'text-[#007639] dark:text-[#3ddc84]'
                      : row.diffTone === 'negative'
                        ? 'text-[#b50909] dark:text-[#ff8080]'
                        : 'text-[#565c65] dark:text-[#a9b4c2]'
                  }`}
                >
                  {row.diff}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
