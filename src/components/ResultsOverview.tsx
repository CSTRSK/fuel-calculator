import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Minus,
} from 'lucide-react';
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

interface ResultsOverviewProps {
  t: TranslationDictionary;
  result: CalculationResult;
  locale: Locale;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
}

export function ResultsOverview({
  t,
  result,
  locale,
  unitSystem,
  currency,
}: ResultsOverviewProps) {
  const isMetric = unitSystem === 'metric';
  const speedUnit = isMetric ? t.unitSpeedMetric : t.unitSpeedImperial;
  const volUnit = isMetric ? t.unitVolumeMetric : t.unitVolumeImperial;
  const co2Unit = isMetric ? t.unitCo2Metric : t.unitCo2Imperial;

  if (!result.isValid) {
    return (
      <section
        aria-labelledby="results-heading"
        className="rounded border border-[#b50909] bg-[#fff5f5] p-6 dark:border-[#ff6b6b] dark:bg-[#2a1518]"
        role="alert"
      >
        <div className="flex items-start gap-3">
          <AlertTriangle
            className="mt-0.5 h-5 w-5 shrink-0 text-[#b50909] dark:text-[#ff8080]"
            aria-hidden="true"
          />
          <div>
            <h2
              id="results-heading"
              className="text-lg font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
            >
              {t.resultsTitle}
            </h2>
            <p className="mt-1 text-sm text-[#1b1b1b] dark:text-[#f0f4f8]">
              {t.validationBanner}
            </p>
          </div>
        </div>
      </section>
    );
  }

  const timeSaved = result.timeDiffHours > 0.0005;
  const timeLost = result.timeDiffHours < -0.0005;
  const fuelMore = result.fuelDiffDisplay > 0.005;
  const fuelLess = result.fuelDiffDisplay < -0.005;
  const costMore = result.costDiff > 0.005;
  const costLess = result.costDiff < -0.005;
  const co2More = result.co2DiffDisplay > 0.005;
  const co2Less = result.co2DiffDisplay < -0.005;

  const absTimePct = Math.min(100, Math.abs(result.timeDiffPercent));
  const time1Formatted = formatDuration(
    result.time1Hours,
    t.unitHourShort,
    t.unitMinShort
  );
  const time2Formatted = formatDuration(
    result.time2Hours,
    t.unitHourShort,
    t.unitMinShort
  );
  const timeDiffFormatted = formatDuration(
    Math.abs(result.timeDiffHours),
    t.unitHourShort,
    t.unitMinShort
  );

  const signedFuel = `${fuelMore ? '+' : fuelLess ? '−' : ''}${formatNumber(
    Math.abs(result.fuelDiffDisplay),
    locale,
    2,
    2
  )} ${volUnit}`;

  const signedCo2 = `${co2More ? '+' : co2Less ? '−' : ''}${formatNumber(
    Math.abs(result.co2DiffDisplay),
    locale,
    2,
    2
  )} ${co2Unit}`;

  const signedAnnualCo2 = `${co2More ? '+' : co2Less ? '−' : ''}${formatNumber(
    Math.abs(result.annualCo2DiffDisplay),
    locale,
    0,
    0
  )} ${co2Unit}`;

  return (
    <section
      aria-labelledby="results-heading"
      className="rounded border border-[#dfe1e2] bg-white p-6 dark:border-[#2e3846] dark:bg-[#1b222c]"
    >
      <div className="mb-5 flex flex-wrap items-baseline justify-between gap-2">
        <h2
          id="results-heading"
          className="text-xl font-bold text-[#162e51] dark:text-[#f0f4f8]"
        >
          {t.resultsTitle}
        </h2>
        <p className="font-mono text-sm tabular-nums text-[#565c65] dark:text-[#a9b4c2]">
          {formatNumber(result.speed1Display, locale, 0, 1)} {speedUnit} vs.{' '}
          {formatNumber(result.speed2Display, locale, 0, 1)} {speedUnit}
        </p>
      </div>

      {/* Screen-reader polite live summary */}
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {timeSaved
          ? `${t.statusTimeSaved}: ${timeDiffFormatted}.`
          : timeLost
            ? `${t.statusTimeLost}: ${timeDiffFormatted}.`
            : `${t.statusEqual}.`}{' '}
        {t.kpiCostTitle}: {formatCurrency(result.costDiff, locale, currency, true)}.{' '}
        {t.kpiCo2Title}: {signedCo2}.
      </div>

      {/* 4-Column KPI Grid */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Time KPI */}
        <div className="rounded border border-[#dfe1e2] bg-[#f8f9fa] p-4 dark:border-[#2e3846] dark:bg-[#11161d]">
          <p className="text-xs font-semibold text-[#565c65] dark:text-[#a9b4c2]">
            {t.kpiTimeTitle}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
            {timeSaved ? `−${timeDiffFormatted}` : timeLost ? `+${timeDiffFormatted}` : '0'}
          </p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-xs font-bold ${
              timeSaved
                ? 'text-[#007639] dark:text-[#3ddc84]'
                : timeLost
                  ? 'text-[#946200] dark:text-[#f5c242]'
                  : 'text-[#565c65] dark:text-[#a9b4c2]'
            }`}
          >
            {timeSaved ? (
              <ArrowDownRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : timeLost ? (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>
              {timeSaved
                ? t.statusTimeSaved
                : timeLost
                  ? t.statusTimeLost
                  : t.statusEqual}
            </span>
          </p>
        </div>

        {/* Cost KPI */}
        <div className="rounded border border-[#dfe1e2] bg-[#f8f9fa] p-4 dark:border-[#2e3846] dark:bg-[#11161d]">
          <p className="text-xs font-semibold text-[#565c65] dark:text-[#a9b4c2]">
            {t.kpiCostTitle}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
            {formatCurrency(result.costDiff, locale, currency, true)}
          </p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-xs font-bold ${
              costLess
                ? 'text-[#007639] dark:text-[#3ddc84]'
                : costMore
                  ? 'text-[#b50909] dark:text-[#ff8080]'
                  : 'text-[#565c65] dark:text-[#a9b4c2]'
            }`}
          >
            {costLess ? (
              <ArrowDownRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : costMore ? (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>
              {costLess
                ? t.statusLessCost
                : costMore
                  ? t.statusMoreCost
                  : t.statusEqual}
            </span>
          </p>
        </div>

        {/* Fuel KPI */}
        <div className="rounded border border-[#dfe1e2] bg-[#f8f9fa] p-4 dark:border-[#2e3846] dark:bg-[#11161d]">
          <p className="text-xs font-semibold text-[#565c65] dark:text-[#a9b4c2]">
            {t.kpiFuelTitle}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
            {signedFuel}
          </p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-xs font-bold ${
              fuelLess
                ? 'text-[#007639] dark:text-[#3ddc84]'
                : fuelMore
                  ? 'text-[#b50909] dark:text-[#ff8080]'
                  : 'text-[#565c65] dark:text-[#a9b4c2]'
            }`}
          >
            {fuelLess ? (
              <ArrowDownRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : fuelMore ? (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>
              {fuelLess
                ? t.statusLessFuel
                : fuelMore
                  ? t.statusMoreFuel
                  : t.statusEqual}
            </span>
          </p>
        </div>

        {/* CO2 KPI */}
        <div className="rounded border border-[#dfe1e2] bg-[#f8f9fa] p-4 dark:border-[#2e3846] dark:bg-[#11161d]">
          <p className="text-xs font-semibold text-[#565c65] dark:text-[#a9b4c2]">
            {t.kpiCo2Title}
          </p>
          <p className="mt-1 font-mono text-2xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
            {signedCo2}
          </p>
          <p
            className={`mt-1.5 flex items-center gap-1 text-xs font-bold ${
              co2Less
                ? 'text-[#007639] dark:text-[#3ddc84]'
                : co2More
                  ? 'text-[#b50909] dark:text-[#ff8080]'
                  : 'text-[#565c65] dark:text-[#a9b4c2]'
            }`}
          >
            {co2Less ? (
              <ArrowDownRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : co2More ? (
              <ArrowUpRight className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            ) : (
              <Minus className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            )}
            <span>
              {co2Less
                ? t.statusLessCo2
                : co2More
                  ? t.statusMoreCo2
                  : t.statusEqual}
            </span>
          </p>
        </div>
      </div>

      {/* Bidirectional Relative Time Bar */}
      <div className="mt-6 border-t border-[#dfe1e2] pt-5 dark:border-[#2e3846]">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
            {t.timeBarTitle}
          </h3>
          <span className="font-mono text-xs tabular-nums text-[#565c65] dark:text-[#a9b4c2]">
            {t.timeAt} {formatNumber(result.speed1Display, locale, 0, 1)} {speedUnit}:{' '}
            <strong className="text-[#1b1b1b] dark:text-[#f0f4f8]">{time1Formatted}</strong>{' '}
            · {t.timeAt} {formatNumber(result.speed2Display, locale, 0, 1)} {speedUnit}:{' '}
            <strong className="text-[#1b1b1b] dark:text-[#f0f4f8]">{time2Formatted}</strong>
          </span>
        </div>

        <div
          role="progressbar"
          aria-label={t.timeBarTitle}
          aria-valuenow={Math.round(absTimePct)}
          aria-valuemin={0}
          aria-valuemax={100}
          className="mt-2.5 h-5 w-full overflow-hidden rounded bg-[#dfe1e2] dark:bg-[#2a3441]"
        >
          <div
            className={`h-full origin-left transition-transform duration-200 ${
              timeSaved
                ? 'bg-[#007639] dark:bg-[#2fb36c]'
                : timeLost
                  ? 'bg-[#b50909] dark:bg-[#e05252]'
                  : 'bg-[#565c65]'
            }`}
            style={{
              transform: `scaleX(${Math.max(absTimePct / 100, 0)})`,
            }}
          />
        </div>

        <p className="mt-2 text-sm text-[#1b1b1b] dark:text-[#d1dae5]">
          {timeSaved ? (
            <>
              {t.timeBarSavedDesc}{' '}
              <strong className="font-mono tabular-nums">
                {formatNumber(absTimePct, locale, 1, 1)}%
              </strong>{' '}
              ({timeDiffFormatted}).
            </>
          ) : timeLost ? (
            <>
              {t.timeBarLostDesc}{' '}
              <strong className="font-mono tabular-nums">
                {formatNumber(absTimePct, locale, 1, 1)}%
              </strong>{' '}
              (+{timeDiffFormatted}).
            </>
          ) : (
            t.timeBarEqualDesc
          )}
        </p>
      </div>

      {/* Economic & Environmental Verdicts */}
      <div className="mt-6 grid grid-cols-1 gap-4 border-t border-[#dfe1e2] pt-5 sm:grid-cols-2 dark:border-[#2e3846]">
        <div>
          <h3 className="text-sm font-bold text-[#162e51] dark:text-[#73b3e7]">
            {t.economicVerdictTitle}
          </h3>
          {result.costPerSavedHour !== null ? (
            <>
              <p className="mt-1.5 text-xs text-[#565c65] dark:text-[#a9b4c2]">
                {timeSaved ? t.costPerSavedHourLabel : t.savingsPerExtraHourLabel}
              </p>
              <p className="mt-0.5 font-mono text-xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
                {formatCurrency(Math.abs(result.costPerSavedHour), locale, currency)} /{' '}
                {t.unitHourShort}
              </p>
              <p className="mt-1 text-xs text-[#565c65] dark:text-[#a9b4c2]">
                {timeSaved ? t.economicHintFaster : t.economicHintSlower}
              </p>
            </>
          ) : (
            <p className="mt-1.5 text-sm text-[#565c65] dark:text-[#a9b4c2]">
              {t.equalSpeedsVerdict}
            </p>
          )}
        </div>

        <div>
          <h3 className="text-sm font-bold text-[#162e51] dark:text-[#73b3e7]">
            {t.co2ImpactTitle}
          </h3>
          <p className="mt-1.5 text-xs text-[#565c65] dark:text-[#a9b4c2]">
            {t.co2AnnualLabel}
          </p>
          <p className="mt-0.5 font-mono text-xl font-semibold tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
            {signedAnnualCo2}
          </p>
          <p className="mt-1 text-xs text-[#565c65] dark:text-[#a9b4c2]">
            {t.co2TreesLabel}:{' '}
            <strong className="font-mono tabular-nums text-[#1b1b1b] dark:text-[#f0f4f8]">
              {formatNumber(result.annualTreeEquivalent, locale, 1, 1)}
            </strong>{' '}
            {t.co2TreesUnit}. {t.co2AnnualBasis}
          </p>
        </div>
      </div>
    </section>
  );
}
