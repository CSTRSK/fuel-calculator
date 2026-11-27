import type {
  CalculationResult,
  CurrencyCode,
  FuelType,
  Locale,
  SpeedCurvePoint,
  TripInputs,
  UnitSystem,
  ValidationErrors,
  VehiclePreset,
  VehiclePresetId,
} from '../types/calculator';

// Physical conversion constants
export const KM_PER_MILE = 1.609344;
export const LITERS_PER_US_GALLON = 3.785411784;
export const MPG_L100KM_CONSTANT = 235.214583; // (100 * LITERS_PER_US_GALLON) / KM_PER_MILE
export const LBS_PER_KG = 2.2046226218;

// CO2 emission factors (kg CO2 per liter of fuel burned, EPA/UBA standard tank-to-wheel)
export const CO2_KG_PER_LITER: Record<FuelType, number> = {
  petrol: 2.31,
  diesel: 2.64,
};

// Mature tree absorbs ~22 kg CO2 per year
export const CO2_KG_PER_TREE_YEAR = 22;

export const VEHICLE_PRESETS: Record<VehiclePresetId, VehiclePreset> = {
  compact: {
    id: 'compact',
    defaultFuelType: 'petrol',
    baseLPer100Km: 2.85,
    dragFactor: 0.000235,
  },
  sedan: {
    id: 'sedan',
    defaultFuelType: 'petrol',
    // Preserves the exact original quadratic aerodynamic model: 3.273 + 0.000273 * v^2
    baseLPer100Km: 3.273,
    dragFactor: 0.000273,
  },
  diesel_wagon: {
    id: 'diesel_wagon',
    defaultFuelType: 'diesel',
    baseLPer100Km: 2.65,
    dragFactor: 0.000225,
  },
  suv: {
    id: 'suv',
    defaultFuelType: 'petrol',
    baseLPer100Km: 4.15,
    dragFactor: 0.000345,
  },
};

export const CURRENCY_META: Record<
  CurrencyCode,
  { symbol: string; label: string; defaultMetricPrice: number }
> = {
  EUR: { symbol: '€', label: 'EUR (€)', defaultMetricPrice: 1.85 },
  USD: { symbol: '$', label: 'USD ($)', defaultMetricPrice: 0.95 },
  GBP: { symbol: '£', label: 'GBP (£)', defaultMetricPrice: 1.52 },
  CHF: { symbol: 'CHF', label: 'CHF (Fr.)', defaultMetricPrice: 1.82 },
  TRY: { symbol: '₺', label: 'TRY (₺)', defaultMetricPrice: 43.5 },
};

export const LOCALE_BCP47: Record<Locale, string> = {
  de: 'de-DE',
  en: 'en-US',
  es: 'es-ES',
  fr: 'fr-FR',
  tr: 'tr-TR',
};

export function getDefaultInputs(unitSystem: UnitSystem, currency: CurrencyCode): TripInputs {
  const metricPrice = CURRENCY_META[currency].defaultMetricPrice;
  if (unitSystem === 'imperial') {
    return {
      distance: '62',
      speed1: '60',
      speed2: '75',
      consumptionMode: 'auto',
      vehiclePresetId: 'sedan',
      fuelType: 'petrol',
      manualCons1: '39.2',
      manualCons2: '32.7',
      fuelPrice: (metricPrice * LITERS_PER_US_GALLON).toFixed(2),
    };
  }
  return {
    distance: '100',
    speed1: '100',
    speed2: '120',
    consumptionMode: 'auto',
    vehiclePresetId: 'sedan',
    fuelType: 'petrol',
    manualCons1: '6.0',
    manualCons2: '7.2',
    fuelPrice: metricPrice.toFixed(2),
  };
}

export function lPer100KmToMpg(lPer100Km: number): number {
  if (lPer100Km <= 0) return 0;
  return MPG_L100KM_CONSTANT / lPer100Km;
}

export function mpgToLPer100Km(mpg: number): number {
  if (mpg <= 0) return 0;
  return MPG_L100KM_CONSTANT / mpg;
}

export function modelConsumptionLPer100Km(
  speedKmH: number,
  presetId: VehiclePresetId
): number {
  const preset = VEHICLE_PRESETS[presetId];
  return preset.baseLPer100Km + preset.dragFactor * speedKmH * speedKmH;
}

/**
 * Safely parses locale-friendly decimal input (supports both "." and ",")
 */
export function parseLocaleNumber(raw: string): number {
  const normalized = raw.trim().replace(',', '.');
  if (normalized === '') return NaN;
  return Number(normalized);
}

/**
 * Converts TripInputs physically between Metric and Imperial so user data remains consistent
 */
export function convertInputsUnitSystem(
  inputs: TripInputs,
  from: UnitSystem,
  to: UnitSystem
): TripInputs {
  if (from === to) return inputs;

  const d = parseLocaleNumber(inputs.distance);
  const v1 = parseLocaleNumber(inputs.speed1);
  const v2 = parseLocaleNumber(inputs.speed2);
  const c1 = parseLocaleNumber(inputs.manualCons1);
  const c2 = parseLocaleNumber(inputs.manualCons2);
  const p = parseLocaleNumber(inputs.fuelPrice);

  if (to === 'imperial') {
    return {
      ...inputs,
      distance: Number.isFinite(d) ? (d / KM_PER_MILE).toFixed(1) : inputs.distance,
      speed1: Number.isFinite(v1) ? Math.round(v1 / KM_PER_MILE).toString() : inputs.speed1,
      speed2: Number.isFinite(v2) ? Math.round(v2 / KM_PER_MILE).toString() : inputs.speed2,
      manualCons1:
        Number.isFinite(c1) && c1 > 0 ? lPer100KmToMpg(c1).toFixed(1) : inputs.manualCons1,
      manualCons2:
        Number.isFinite(c2) && c2 > 0 ? lPer100KmToMpg(c2).toFixed(1) : inputs.manualCons2,
      fuelPrice: Number.isFinite(p) ? (p * LITERS_PER_US_GALLON).toFixed(2) : inputs.fuelPrice,
    };
  }

  // to === 'metric'
  return {
    ...inputs,
    distance: Number.isFinite(d) ? (d * KM_PER_MILE).toFixed(1) : inputs.distance,
    speed1: Number.isFinite(v1) ? Math.round(v1 * KM_PER_MILE).toString() : inputs.speed1,
    speed2: Number.isFinite(v2) ? Math.round(v2 * KM_PER_MILE).toString() : inputs.speed2,
    manualCons1:
      Number.isFinite(c1) && c1 > 0 ? mpgToLPer100Km(c1).toFixed(1) : inputs.manualCons1,
    manualCons2:
      Number.isFinite(c2) && c2 > 0 ? mpgToLPer100Km(c2).toFixed(1) : inputs.manualCons2,
    fuelPrice: Number.isFinite(p) ? (p / LITERS_PER_US_GALLON).toFixed(2) : inputs.fuelPrice,
  };
}

export function validateInputs(
  inputs: TripInputs,
  unitSystem: UnitSystem
): ValidationErrors {
  const errors: ValidationErrors = {};
  const maxSpeed = unitSystem === 'metric' ? 350 : 220;

  const d = parseLocaleNumber(inputs.distance);
  if (!Number.isFinite(d) || d <= 0 || d > 100000) {
    errors.distance = 'distance';
  }

  const v1 = parseLocaleNumber(inputs.speed1);
  if (!Number.isFinite(v1) || v1 < 5 || v1 > maxSpeed) {
    errors.speed1 = 'speed';
  }

  const v2 = parseLocaleNumber(inputs.speed2);
  if (!Number.isFinite(v2) || v2 < 5 || v2 > maxSpeed) {
    errors.speed2 = 'speed';
  }

  if (inputs.consumptionMode === 'manual') {
    const c1 = parseLocaleNumber(inputs.manualCons1);
    const c2 = parseLocaleNumber(inputs.manualCons2);
    const maxCons = unitSystem === 'metric' ? 60 : 200;
    if (!Number.isFinite(c1) || c1 <= 0 || c1 > maxCons) {
      errors.manualCons1 = 'consumption';
    }
    if (!Number.isFinite(c2) || c2 <= 0 || c2 > maxCons) {
      errors.manualCons2 = 'consumption';
    }
  }

  const p = parseLocaleNumber(inputs.fuelPrice);
  if (!Number.isFinite(p) || p < 0 || p > 500) {
    errors.fuelPrice = 'price';
  }

  return errors;
}

export function calculateTripAnalysis(
  inputs: TripInputs,
  unitSystem: UnitSystem
): CalculationResult {
  const errors = validateInputs(inputs, unitSystem);
  const isValid = Object.keys(errors).length === 0;

  const emptyResult: CalculationResult = {
    isValid: false,
    errors,
    distanceDisplay: 0,
    speed1Display: 0,
    speed2Display: 0,
    time1Hours: 0,
    time2Hours: 0,
    timeDiffHours: 0,
    timeDiffPercent: 0,
    cons1Display: 0,
    cons2Display: 0,
    cons1LPer100Km: 0,
    cons2LPer100Km: 0,
    fuel1Display: 0,
    fuel2Display: 0,
    fuelDiffDisplay: 0,
    fuelDiffPercent: 0,
    cost1: 0,
    cost2: 0,
    costDiff: 0,
    costPerSavedHour: null,
    co2_1Display: 0,
    co2_2Display: 0,
    co2DiffDisplay: 0,
    co2DiffPercent: 0,
    annualCo2DiffDisplay: 0,
    annualTreeEquivalent: 0,
    curvePoints: [],
  };

  if (!isValid) {
    return emptyResult;
  }

  const distanceDisplay = parseLocaleNumber(inputs.distance);
  const speed1Display = parseLocaleNumber(inputs.speed1);
  const speed2Display = parseLocaleNumber(inputs.speed2);
  const fuelPriceDisplay = parseLocaleNumber(inputs.fuelPrice);

  // Convert core physics inputs to metric base (km, km/h, L/100km, price/L)
  const distanceKm = unitSystem === 'metric' ? distanceDisplay : distanceDisplay * KM_PER_MILE;
  const speed1KmH = unitSystem === 'metric' ? speed1Display : speed1Display * KM_PER_MILE;
  const speed2KmH = unitSystem === 'metric' ? speed2Display : speed2Display * KM_PER_MILE;
  const pricePerLiter =
    unitSystem === 'metric' ? fuelPriceDisplay : fuelPriceDisplay / LITERS_PER_US_GALLON;

  // Time calculation
  const time1Hours = distanceKm / speed1KmH;
  const time2Hours = distanceKm / speed2KmH;
  const timeDiffHours = time1Hours - time2Hours; // >0 means speed 2 saves time
  const timeDiffPercent = time1Hours > 0 ? (timeDiffHours / time1Hours) * 100 : 0;

  // Fuel consumption rate (L/100km)
  let cons1LPer100Km: number;
  let cons2LPer100Km: number;

  if (inputs.consumptionMode === 'manual') {
    const rawC1 = parseLocaleNumber(inputs.manualCons1);
    const rawC2 = parseLocaleNumber(inputs.manualCons2);
    cons1LPer100Km = unitSystem === 'metric' ? rawC1 : mpgToLPer100Km(rawC1);
    cons2LPer100Km = unitSystem === 'metric' ? rawC2 : mpgToLPer100Km(rawC2);
  } else {
    cons1LPer100Km = modelConsumptionLPer100Km(speed1KmH, inputs.vehiclePresetId);
    cons2LPer100Km = modelConsumptionLPer100Km(speed2KmH, inputs.vehiclePresetId);
  }

  const cons1Display =
    unitSystem === 'metric' ? cons1LPer100Km : lPer100KmToMpg(cons1LPer100Km);
  const cons2Display =
    unitSystem === 'metric' ? cons2LPer100Km : lPer100KmToMpg(cons2LPer100Km);

  // Total fuel in liters
  const fuel1Liters = (cons1LPer100Km * distanceKm) / 100;
  const fuel2Liters = (cons2LPer100Km * distanceKm) / 100;
  const fuelDiffLiters = fuel2Liters - fuel1Liters;
  const fuelDiffPercent = fuel1Liters > 0 ? (fuelDiffLiters / fuel1Liters) * 100 : 0;

  const fuel1Display =
    unitSystem === 'metric' ? fuel1Liters : fuel1Liters / LITERS_PER_US_GALLON;
  const fuel2Display =
    unitSystem === 'metric' ? fuel2Liters : fuel2Liters / LITERS_PER_US_GALLON;
  const fuelDiffDisplay = fuel2Display - fuel1Display;

  // Financial costs
  const cost1 = fuel1Liters * pricePerLiter;
  const cost2 = fuel2Liters * pricePerLiter;
  const costDiff = cost2 - cost1;

  // Cost per hour of time saved (magnitude when speed2 != speed1)
  const costPerSavedHour =
    Math.abs(timeDiffHours) > 0.0005 ? costDiff / timeDiffHours : null;

  // CO2 emissions
  const co2Factor = CO2_KG_PER_LITER[inputs.fuelType];
  const co2_1Kg = fuel1Liters * co2Factor;
  const co2_2Kg = fuel2Liters * co2Factor;
  const co2DiffKg = co2_2Kg - co2_1Kg;
  const co2DiffPercent = co2_1Kg > 0 ? (co2DiffKg / co2_1Kg) * 100 : 0;

  const co2_1Display = unitSystem === 'metric' ? co2_1Kg : co2_1Kg * LBS_PER_KG;
  const co2_2Display = unitSystem === 'metric' ? co2_2Kg : co2_2Kg * LBS_PER_KG;
  const co2DiffDisplay = co2_2Display - co2_1Display;

  // 200 trips/year commuter projection
  const annualCo2DiffKg = co2DiffKg * 200;
  const annualCo2DiffDisplay =
    unitSystem === 'metric' ? annualCo2DiffKg : annualCo2DiffKg * LBS_PER_KG;
  const annualTreeEquivalent = Math.abs(annualCo2DiffKg) / CO2_KG_PER_TREE_YEAR;

  // Generate speed curve points covering standard range plus user's V1 & V2
  const minDisplay =
    unitSystem === 'metric'
      ? Math.min(60, Math.floor(Math.min(speed1Display, speed2Display) / 10) * 10)
      : Math.min(35, Math.floor(Math.min(speed1Display, speed2Display) / 5) * 5);
  const maxDisplay =
    unitSystem === 'metric'
      ? Math.max(180, Math.ceil(Math.max(speed1Display, speed2Display) / 10) * 10)
      : Math.max(110, Math.ceil(Math.max(speed1Display, speed2Display) / 5) * 5);

  const clampedMin = Math.max(unitSystem === 'metric' ? 30 : 20, minDisplay);
  const clampedMax = Math.min(unitSystem === 'metric' ? 240 : 150, maxDisplay);
  const steps = 24;
  const curvePoints: SpeedCurvePoint[] = [];

  for (let i = 0; i <= steps; i++) {
    const spdDisplay = clampedMin + ((clampedMax - clampedMin) * i) / steps;
    const spdKmH = unitSystem === 'metric' ? spdDisplay : spdDisplay * KM_PER_MILE;
    const consL100 = modelConsumptionLPer100Km(spdKmH, inputs.vehiclePresetId);
    const consDisp = unitSystem === 'metric' ? consL100 : lPer100KmToMpg(consL100);
    const tripHrs = distanceKm / spdKmH;
    const tripLiters = (consL100 * distanceKm) / 100;
    const tripCost = tripLiters * pricePerLiter;
    const tripCo2Kg = tripLiters * co2Factor;
    const tripCo2Disp = unitSystem === 'metric' ? tripCo2Kg : tripCo2Kg * LBS_PER_KG;

    curvePoints.push({
      speedDisplay: spdDisplay,
      speedKmH: spdKmH,
      consumptionDisplay: consDisp,
      consumptionLPer100Km: consL100,
      tripHours: tripHrs,
      tripCost,
      tripCo2Display: tripCo2Disp,
    });
  }

  return {
    isValid: true,
    errors,
    distanceDisplay,
    speed1Display,
    speed2Display,
    time1Hours,
    time2Hours,
    timeDiffHours,
    timeDiffPercent,
    cons1Display,
    cons2Display,
    cons1LPer100Km,
    cons2LPer100Km,
    fuel1Display,
    fuel2Display,
    fuelDiffDisplay,
    fuelDiffPercent,
    cost1,
    cost2,
    costDiff,
    costPerSavedHour,
    co2_1Display,
    co2_2Display,
    co2DiffDisplay,
    co2DiffPercent,
    annualCo2DiffDisplay,
    annualTreeEquivalent,
    curvePoints,
  };
}

export function formatDuration(hours: number, hourUnit: string, minUnit: string): string {
  const totalMinutes = Math.round(Math.abs(hours) * 60);
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  if (h === 0) return `${m}${minUnit}`;
  return `${h}${hourUnit} ${m.toString().padStart(2, '0')}${minUnit}`;
}

export function formatNumber(
  value: number,
  locale: Locale,
  minimumFractionDigits = 1,
  maximumFractionDigits = 1
): string {
  return new Intl.NumberFormat(LOCALE_BCP47[locale], {
    minimumFractionDigits,
    maximumFractionDigits,
  }).format(value);
}

export function formatCurrency(
  value: number,
  locale: Locale,
  currency: CurrencyCode,
  showSign = false
): string {
  const formatted = new Intl.NumberFormat(LOCALE_BCP47[locale], {
    style: 'currency',
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(Math.abs(value));

  if (!showSign) {
    return value < 0 ? `-${formatted}` : formatted;
  }
  if (Math.abs(value) < 0.005) return formatted;
  return value > 0 ? `+${formatted}` : `-${formatted}`;
}
