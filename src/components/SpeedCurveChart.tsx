import { useState } from 'react';
import type { TranslationDictionary } from '../data/translations';
import type {
  CalculationResult,
  ChartMetric,
  ConsumptionMode,
  CurrencyCode,
  Locale,
  SpeedCurvePoint,
  UnitSystem,
} from '../types/calculator';
import {
  formatCurrency,
  formatDuration,
  formatNumber,
} from '../utils/calculations';

interface SpeedCurveChartProps {
  t: TranslationDictionary;
  result: CalculationResult;
  locale: Locale;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
  consumptionMode: ConsumptionMode;
}

export function SpeedCurveChart({
  t,
  result,
  locale,
  unitSystem,
  currency,
  consumptionMode,
}: SpeedCurveChartProps) {
  const [metric, setMetric] = useState<ChartMetric>('consumption');
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (!result.isValid || result.curvePoints.length === 0) {
    return null;
  }

  const isMetric = unitSystem === 'metric';
  const speedUnit = isMetric ? t.unitSpeedMetric : t.unitSpeedImperial;
  const consUnit = isMetric ? t.unitConsMetric : t.unitConsImperial;
  const co2Unit = isMetric ? t.unitCo2Metric : t.unitCo2Imperial;

  const getYValue = (pt: SpeedCurvePoint): number => {
    if (metric === 'consumption') return pt.consumptionDisplay;
    if (metric === 'cost') return pt.tripCost;
    return pt.tripCo2Display;
  };

  const v1Y =
    metric === 'consumption'
      ? result.cons1Display
      : metric === 'cost'
        ? result.cost1
        : result.co2_1Display;

  const v2Y =
    metric === 'consumption'
      ? result.cons2Display
      : metric === 'cost'
        ? result.cost2
        : result.co2_2Display;

  const points = result.curvePoints;
  const minX = points[0].speedDisplay;
  const maxX = points[points.length - 1].speedDisplay;

  const allYValues = [...points.map(getYValue), v1Y, v2Y];
  const rawMinY = Math.min(...allYValues);
  const rawMaxY = Math.max(...allYValues);
  const yPad = Math.max((rawMaxY - rawMinY) * 0.14, 0.5);
  const minY = Math.max(0, rawMinY - yPad);
  const maxY = rawMaxY + yPad;

  // SVG layout coordinates
  const width = 680;
  const height = 270;
  const padLeft = 64;
  const padRight = 24;
  const padTop = 20;
  const padBottom = 42;
  const plotW = width - padLeft - padRight;
  const plotH = height - padTop - padBottom;

  const xScale = (spd: number) => {
    if (maxX === minX) return padLeft;
    return padLeft + ((spd - minX) / (maxX - minX)) * plotW;
  };

  const yScale = (val: number) => {
    if (maxY === minY) return padTop + plotH / 2;
    return padTop + plotH - ((val - minY) / (maxY - minY)) * plotH;
  };

  const pathD = points
    .map((pt, idx) => {
      const x = xScale(pt.speedDisplay).toFixed(1);
      const y = yScale(getYValue(pt)).toFixed(1);
      return `${idx === 0 ? 'M' : 'L'} ${x} ${y}`;
    })
    .join(' ');

  const areaD = `${pathD} L ${xScale(maxX).toFixed(1)} ${(padTop + plotH).toFixed(1)} L ${xScale(minX).toFixed(1)} ${(padTop + plotH).toFixed(1)} Z`;

  const yTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => minY + frac * (maxY - minY));
  const xTicks = [0, 0.25, 0.5, 0.75, 1].map((frac) => minX + frac * (maxX - minX));

  const formatMetricValue = (val: number) => {
    if (metric === 'consumption') {
      return `${formatNumber(val, locale, 1, 1)} ${consUnit}`;
    }
    if (metric === 'cost') {
      return formatCurrency(val, locale, currency);
    }
    return `${formatNumber(val, locale, 2, 2)} ${co2Unit}`;
  };

  const inspectedPoint =
    activeIndex !== null && points[activeIndex] ? points[activeIndex] : null;

  const v1XCoord = xScale(result.speed1Display);
  const v1YCoord = yScale(v1Y);
  const v2XCoord = xScale(result.speed2Display);
  const v2YCoord = yScale(v2Y);

  const metricTabs: Array<{ id: ChartMetric; label: string }> = [
    { id: 'consumption', label: t.chartMetricConsumption },
    { id: 'cost', label: t.chartMetricCost },
    { id: 'co2', label: t.chartMetricCo2 },
  ];

  return (
    <section
      id="curves-section"
      aria-labelledby="chart-heading"
      className="rounded border border-[#dfe1e2] bg-white p-6 dark:border-[#2e3846] dark:bg-[#1b222c]"
    >
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2
            id="chart-heading"
            className="text-xl font-bold text-[#162e51] dark:text-[#f0f4f8]"
          >
            {t.chartTitle}
          </h2>
          <p className="mt-1 text-sm text-[#565c65] dark:text-[#a9b4c2]">
            {t.chartSubtitle}
          </p>
        </div>

        {/* Accessible Metric Tabs */}
        <div
          role="tablist"
          aria-label={t.chartTitle}
          className="inline-flex flex-wrap rounded border border-[#565c65] bg-[#f0f0f0] p-0.5 dark:border-[#526072] dark:bg-[#11161d]"
        >
          {metricTabs.map((tab) => {
            const active = metric === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setMetric(tab.id)}
                className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-xs font-bold transition-colors duration-150 ${
                  active
                    ? 'bg-[#005ea2] text-white dark:bg-[#2b7cd3]'
                    : 'text-[#1b1b1b] hover:bg-white dark:text-[#d1dae5] dark:hover:bg-[#1f2937]'
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {consumptionMode === 'manual' && (
        <p className="mt-3 rounded border border-[#c6cace] bg-[#f8f9fa] px-3 py-2 text-xs text-[#3d4551] dark:border-[#3b4757] dark:bg-[#11161d] dark:text-[#c7d1dd]">
          {t.chartManualNotice}
        </p>
      )}

      {/* Legend & Interactive Inspection Readout */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-y border-[#dfe1e2] py-2.5 text-xs dark:border-[#2e3846]">
        <div className="flex flex-wrap items-center gap-4 font-semibold text-[#1b1b1b] dark:text-[#e2e8f0]">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full border-2 border-white bg-[#005ea2] dark:border-[#1b222c] dark:bg-[#4ea8ff]"
              aria-hidden="true"
            />
            <span>
              {t.chartMarkerV1} ({formatNumber(result.speed1Display, locale, 0, 1)}{' '}
              {speedUnit}):{' '}
              <strong className="font-mono tabular-nums">{formatMetricValue(v1Y)}</strong>
            </span>
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span
              className="inline-block h-3 w-3 rounded-full border-2 border-white bg-[#b50909] dark:border-[#1b222c] dark:bg-[#ff6b6b]"
              aria-hidden="true"
            />
            <span>
              {t.chartMarkerV2} ({formatNumber(result.speed2Display, locale, 0, 1)}{' '}
              {speedUnit}):{' '}
              <strong className="font-mono tabular-nums">{formatMetricValue(v2Y)}</strong>
            </span>
          </span>
        </div>

        <div className="font-mono tabular-nums text-[#565c65] dark:text-[#a9b4c2]">
          {inspectedPoint ? (
            <span>
              {t.chartInspectSpeed}:{' '}
              <strong className="text-[#1b1b1b] dark:text-[#f0f4f8]">
                {formatNumber(inspectedPoint.speedDisplay, locale, 0, 0)} {speedUnit}
              </strong>{' '}
              · {formatMetricValue(getYValue(inspectedPoint))} · {t.chartInspectTime}:{' '}
              {formatDuration(
                inspectedPoint.tripHours,
                t.unitHourShort,
                t.unitMinShort
              )}
            </span>
          ) : (
            <span>{t.chartHoverHint}</span>
          )}
        </div>
      </div>

      {/* Responsive SVG Plot */}
      <div className="mt-4 w-full overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          role="img"
          aria-label={`${t.chartTitle} – ${metricTabs.find((m) => m.id === metric)?.label}`}
          className="h-auto w-full min-w-[440px] select-none"
          onMouseLeave={() => setActiveIndex(null)}
        >
          {/* Horizontal grid lines & Y axis labels */}
          {yTicks.map((tick, idx) => {
            const y = yScale(tick);
            return (
              <g key={idx}>
                <line
                  x1={padLeft}
                  y1={y}
                  x2={width - padRight}
                  y2={y}
                  className="stroke-[#dfe1e2] dark:stroke-[#2e3846]"
                  strokeWidth="1"
                  strokeDasharray={idx === 0 ? undefined : '3 3'}
                />
                <text
                  x={padLeft - 10}
                  y={y + 4}
                  textAnchor="end"
                  className="fill-[#565c65] font-mono text-[11px] dark:fill-[#a9b4c2]"
                >
                  {formatNumber(tick, locale, metric === 'consumption' ? 1 : 0, 1)}
                </text>
              </g>
            );
          })}

          {/* X axis labels */}
          {xTicks.map((tick, idx) => {
            const x = xScale(tick);
            return (
              <g key={idx}>
                <line
                  x1={x}
                  y1={padTop + plotH}
                  x2={x}
                  y2={padTop + plotH + 5}
                  className="stroke-[#565c65] dark:stroke-[#8a99ad]"
                  strokeWidth="1"
                />
                <text
                  x={x}
                  y={padTop + plotH + 20}
                  textAnchor="middle"
                  className="fill-[#565c65] font-mono text-[11px] dark:fill-[#a9b4c2]"
                >
                  {Math.round(tick)} {speedUnit}
                </text>
              </g>
            );
          })}

          {/* Subtle shaded area */}
          <path
            d={areaD}
            className="fill-[#005ea2]/10 dark:fill-[#4ea8ff]/15"
          />

          {/* Main curve path */}
          <path
            d={pathD}
            fill="none"
            className="stroke-[#005ea2] dark:stroke-[#4ea8ff]"
            strokeWidth="2.5"
            strokeLinejoin="round"
            strokeLinecap="round"
          />

          {/* Interactive focusable & hoverable points along the curve */}
          {points.map((pt, idx) => {
            const cx = xScale(pt.speedDisplay);
            const cy = yScale(getYValue(pt));
            const isFocused = activeIndex === idx;
            return (
              <g key={idx}>
                <circle
                  cx={cx}
                  cy={cy}
                  r={isFocused ? 5 : 2.5}
                  className={
                    isFocused
                      ? 'fill-[#162e51] stroke-white dark:fill-[#f0f4f8] dark:stroke-[#1b222c]'
                      : 'fill-[#005ea2]/40 dark:fill-[#4ea8ff]/40'
                  }
                  strokeWidth={isFocused ? 2 : 0}
                />
                <circle
                  cx={cx}
                  cy={cy}
                  r={12}
                  fill="transparent"
                  tabIndex={idx % 3 === 0 ? 0 : -1}
                  role="button"
                  aria-label={`${Math.round(pt.speedDisplay)} ${speedUnit}: ${formatMetricValue(getYValue(pt))}`}
                  onMouseEnter={() => setActiveIndex(idx)}
                  onFocus={() => setActiveIndex(idx)}
                  onBlur={() => setActiveIndex(null)}
                  className="cursor-pointer outline-none"
                />
              </g>
            );
          })}

          {/* Vertical drop lines for V1 & V2 */}
          <line
            x1={v1XCoord}
            y1={v1YCoord}
            x2={v1XCoord}
            y2={padTop + plotH}
            className="stroke-[#005ea2] dark:stroke-[#4ea8ff]"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />
          <line
            x1={v2XCoord}
            y1={v2YCoord}
            x2={v2XCoord}
            y2={padTop + plotH}
            className="stroke-[#b50909] dark:stroke-[#ff6b6b]"
            strokeWidth="1.5"
            strokeDasharray="4 3"
          />

          {/* V1 Pin */}
          <circle
            cx={v1XCoord}
            cy={v1YCoord}
            r="6.5"
            className="fill-[#005ea2] stroke-white dark:fill-[#4ea8ff] dark:stroke-[#1b222c]"
            strokeWidth="2.5"
          />
          <text
            x={v1XCoord}
            y={Math.max(padTop + 12, v1YCoord - 12)}
            textAnchor="middle"
            className="fill-[#162e51] font-mono text-[11px] font-bold dark:fill-[#f0f4f8]"
          >
            V1
          </text>

          {/* V2 Pin */}
          <circle
            cx={v2XCoord}
            cy={v2YCoord}
            r="6.5"
            className="fill-[#b50909] stroke-white dark:fill-[#ff6b6b] dark:stroke-[#1b222c]"
            strokeWidth="2.5"
          />
          <text
            x={v2XCoord}
            y={Math.max(padTop + 12, v2YCoord - 12)}
            textAnchor="middle"
            className="fill-[#b50909] font-mono text-[11px] font-bold dark:fill-[#ff8080]"
          >
            V2
          </text>
        </svg>
      </div>
    </section>
  );
}
