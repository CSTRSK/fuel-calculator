export type Locale = 'de' | 'en' | 'es' | 'fr' | 'tr';

export type UnitSystem = 'metric' | 'imperial';

export type CurrencyCode = 'EUR' | 'USD' | 'GBP' | 'CHF' | 'TRY';

export type ThemeMode = 'light' | 'dark';

export type ConsumptionMode = 'auto' | 'manual';

export type VehiclePresetId = 'compact' | 'sedan' | 'diesel_wagon' | 'suv';

export type FuelType = 'petrol' | 'diesel';

export type ChartMetric = 'consumption' | 'cost' | 'co2';

export interface UserPreferences {
  locale: Locale;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
  theme: ThemeMode;
}

export interface TripInputs {
  distance: string;
  speed1: string;
  speed2: string;
  consumptionMode: ConsumptionMode;
  vehiclePresetId: VehiclePresetId;
  fuelType: FuelType;
  manualCons1: string;
  manualCons2: string;
  fuelPrice: string;
}

export interface ValidationErrors {
  distance?: string;
  speed1?: string;
  speed2?: string;
  manualCons1?: string;
  manualCons2?: string;
  fuelPrice?: string;
}

export interface VehiclePreset {
  id: VehiclePresetId;
  defaultFuelType: FuelType;
  /** Base rolling & auxiliary consumption in L/100km */
  baseLPer100Km: number;
  /** Quadratic aerodynamic drag factor in L/(100km * (km/h)^2) */
  dragFactor: number;
}

export interface SpeedCurvePoint {
  speedDisplay: number;
  speedKmH: number;
  consumptionDisplay: number;
  consumptionLPer100Km: number;
  tripHours: number;
  tripCost: number;
  tripCo2Display: number;
}

export interface CalculationResult {
  isValid: boolean;
  errors: ValidationErrors;
  distanceDisplay: number;
  speed1Display: number;
  speed2Display: number;
  time1Hours: number;
  time2Hours: number;
  /** Positive means Speed 2 is faster (saves time); negative means Speed 2 is slower (loses time) */
  timeDiffHours: number;
  /** Positive % = time saved by Speed 2; negative % = extra time required by Speed 2 */
  timeDiffPercent: number;
  /** Specific consumption in display units (L/100km for metric, MPG US for imperial) */
  cons1Display: number;
  cons2Display: number;
  cons1LPer100Km: number;
  cons2LPer100Km: number;
  /** Total fuel consumed on the trip in display volume units (L or US gal) */
  fuel1Display: number;
  fuel2Display: number;
  /** Positive = Speed 2 uses more fuel; negative = Speed 2 saves fuel */
  fuelDiffDisplay: number;
  fuelDiffPercent: number;
  /** Total trip fuel cost in selected currency */
  cost1: number;
  cost2: number;
  /** Positive = Speed 2 costs more; negative = Speed 2 saves money */
  costDiff: number;
  /** Implied financial cost per hour of time saved (null when speeds are equal) */
  costPerSavedHour: number | null;
  /** CO2 emissions in display mass units (kg for metric, lb for imperial) */
  co2_1Display: number;
  co2_2Display: number;
  /** Positive = Speed 2 emits more CO2; negative = Speed 2 saves CO2 */
  co2DiffDisplay: number;
  co2DiffPercent: number;
  /** Annual commuter CO2 delta (200 trips/year) in display mass units */
  annualCo2DiffDisplay: number;
  /** Equivalent mature trees needed per year to absorb annual CO2 delta (22 kg CO2/tree/year) */
  annualTreeEquivalent: number;
  curvePoints: SpeedCurvePoint[];
}
