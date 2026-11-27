import { AlertCircle, ArrowLeftRight } from 'lucide-react';
import type { TranslationDictionary } from '../data/translations';
import type {
  ConsumptionMode,
  CurrencyCode,
  FuelType,
  TripInputs,
  UnitSystem,
  ValidationErrors,
  VehiclePresetId,
} from '../types/calculator';
import { CURRENCY_META, VEHICLE_PRESETS } from '../utils/calculations';

interface TripFormProps {
  t: TranslationDictionary;
  inputs: TripInputs;
  errors: ValidationErrors;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
  onChange: (patch: Partial<TripInputs>) => void;
  onPresetSelect: (presetId: VehiclePresetId) => void;
  onModeChange: (mode: ConsumptionMode) => void;
  onSwapSpeeds: () => void;
}

const PRESET_ORDER: VehiclePresetId[] = ['compact', 'sedan', 'diesel_wagon', 'suv'];

export function TripForm({
  t,
  inputs,
  errors,
  unitSystem,
  currency,
  onChange,
  onPresetSelect,
  onModeChange,
  onSwapSpeeds,
}: TripFormProps) {
  const isMetric = unitSystem === 'metric';
  const distUnit = isMetric ? t.unitDistanceMetric : t.unitDistanceImperial;
  const speedUnit = isMetric ? t.unitSpeedMetric : t.unitSpeedImperial;
  const consUnit = isMetric ? t.unitConsMetric : t.unitConsImperial;
  const volUnit = isMetric ? t.unitVolumeMetric : t.unitVolumeImperial;
  const currencySymbol = CURRENCY_META[currency].symbol;

  const activePreset = VEHICLE_PRESETS[inputs.vehiclePresetId];

  return (
    <section
      aria-labelledby="trip-params-heading"
      className="rounded border border-[#dfe1e2] bg-white p-6 dark:border-[#2e3846] dark:bg-[#1b222c]"
    >
      <div className="mb-5">
        <h2
          id="trip-params-heading"
          className="text-xl font-bold text-[#162e51] dark:text-[#f0f4f8]"
        >
          {t.tripParamsTitle}
        </h2>
        <p className="mt-1 text-sm text-[#565c65] dark:text-[#a9b4c2]">
          {t.tripParamsDesc}
        </p>
      </div>

      <form
        noValidate
        onSubmit={(e) => e.preventDefault()}
        className="space-y-6"
      >
        {/* Distance */}
        <div>
          <label
            htmlFor="input-distance"
            className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
          >
            {t.distanceLabel}
          </label>
          <p
            id="hint-distance"
            className="mt-0.5 text-xs text-[#565c65] dark:text-[#a9b4c2]"
          >
            {isMetric ? t.distanceHintMetric : t.distanceHintImperial}
          </p>
          <div className="mt-2 flex">
            <input
              id="input-distance"
              type="number"
              inputMode="decimal"
              min="0.1"
              step="any"
              value={inputs.distance}
              aria-describedby={
                errors.distance ? 'hint-distance err-distance' : 'hint-distance'
              }
              aria-invalid={Boolean(errors.distance)}
              onChange={(e) => onChange({ distance: e.target.value })}
              className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                errors.distance
                  ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                  : 'border-[#565c65] bg-white dark:border-[#526072]'
              }`}
            />
            <span
              aria-hidden="true"
              className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3.5 text-sm font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
            >
              {distUnit}
            </span>
          </div>
          {errors.distance && (
            <p
              id="err-distance"
              role="alert"
              className="mt-1.5 flex items-center gap-1.5 text-sm font-semibold text-[#b50909] dark:text-[#ff8080]"
            >
              <AlertCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>{t.errDistance}</span>
            </p>
          )}
        </div>

        {/* Speeds 1 & 2 */}
        <div>
          <div className="mb-1 flex flex-wrap items-center justify-between gap-x-2 gap-y-1">
            <span className="min-w-0 text-xs text-[#565c65] dark:text-[#a9b4c2]" id="hint-speeds">
              {isMetric ? t.speedHintMetric : t.speedHintImperial}
            </span>
            <button
              type="button"
              onClick={onSwapSpeeds}
              className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-1.5 whitespace-nowrap rounded border border-[#005ea2] bg-white px-2.5 py-1 text-xs font-bold text-[#005ea2] transition-colors duration-150 hover:bg-[#e6f0f8] dark:border-[#60a5fa] dark:bg-[#11161d] dark:text-[#73b3e7] dark:hover:bg-[#1e2d3f]"
            >
              <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{t.swapSpeeds}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {/* Speed 1 */}
            <div>
              <label
                htmlFor="input-speed1"
                className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.speed1Label}
              </label>
              <div className="mt-1.5 flex">
                <input
                  id="input-speed1"
                  type="number"
                  inputMode="decimal"
                  min="5"
                  step="any"
                  value={inputs.speed1}
                  aria-describedby={
                    errors.speed1 ? 'hint-speeds err-speed1' : 'hint-speeds'
                  }
                  aria-invalid={Boolean(errors.speed1)}
                  onChange={(e) => onChange({ speed1: e.target.value })}
                  className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                    errors.speed1
                      ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                      : 'border-[#565c65] bg-white dark:border-[#526072]'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3 text-sm font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
                >
                  {speedUnit}
                </span>
              </div>
              {errors.speed1 && (
                <p
                  id="err-speed1"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#b50909] dark:text-[#ff8080]"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{isMetric ? t.errSpeedMetric : t.errSpeedImperial}</span>
                </p>
              )}
            </div>

            {/* Speed 2 */}
            <div>
              <label
                htmlFor="input-speed2"
                className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
              >
                {t.speed2Label}
              </label>
              <div className="mt-1.5 flex">
                <input
                  id="input-speed2"
                  type="number"
                  inputMode="decimal"
                  min="5"
                  step="any"
                  value={inputs.speed2}
                  aria-describedby={
                    errors.speed2 ? 'hint-speeds err-speed2' : 'hint-speeds'
                  }
                  aria-invalid={Boolean(errors.speed2)}
                  onChange={(e) => onChange({ speed2: e.target.value })}
                  className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                    errors.speed2
                      ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                      : 'border-[#565c65] bg-white dark:border-[#526072]'
                  }`}
                />
                <span
                  aria-hidden="true"
                  className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3 text-sm font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
                >
                  {speedUnit}
                </span>
              </div>
              {errors.speed2 && (
                <p
                  id="err-speed2"
                  role="alert"
                  className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#b50909] dark:text-[#ff8080]"
                >
                  <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>{isMetric ? t.errSpeedMetric : t.errSpeedImperial}</span>
                </p>
              )}
            </div>
          </div>
        </div>

        <hr className="border-[#dfe1e2] dark:border-[#2e3846]" />

        {/* Consumption Mode Fieldset */}
        <fieldset>
          <legend className="text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
            {t.consumptionModeTitle}
          </legend>
          <p className="mt-0.5 text-xs text-[#565c65] dark:text-[#a9b4c2]">
            {t.consumptionModeHint}
          </p>

          <div className="mt-3 grid grid-cols-1 gap-2.5">
            {(['auto', 'manual'] as ConsumptionMode[]).map((mode) => {
              const checked = inputs.consumptionMode === mode;
              return (
                <label
                  key={mode}
                  className={`flex min-h-[44px] cursor-pointer items-start gap-3 rounded border p-3 transition-colors duration-150 ${
                    checked
                      ? 'border-[#005ea2] bg-[#eef5fb] dark:border-[#4ea8ff] dark:bg-[#16273a]'
                      : 'border-[#c6cace] bg-white hover:bg-[#f8f9fa] dark:border-[#3b4757] dark:bg-[#11161d] dark:hover:bg-[#19212c]'
                  }`}
                >
                  <input
                    type="radio"
                    name="consumptionMode"
                    value={mode}
                    checked={checked}
                    onChange={() => onModeChange(mode)}
                    className="mt-1 h-4 w-4 accent-[#005ea2]"
                  />
                  <span>
                    <span className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
                      {mode === 'auto' ? t.modeAutoLabel : t.modeManualLabel}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#565c65] dark:text-[#a9b4c2]">
                      {mode === 'auto' ? t.modeAutoDesc : t.modeManualDesc}
                    </span>
                  </span>
                </label>
              );
            })}
          </div>
        </fieldset>

        {/* Auto Mode: Vehicle Presets */}
        {inputs.consumptionMode === 'auto' ? (
          <div>
            <p className="text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
              {t.vehiclePresetLabel}
            </p>
            <div
              role="radiogroup"
              aria-label={t.vehiclePresetLabel}
              className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2"
            >
              {PRESET_ORDER.map((presetId) => {
                const selected = inputs.vehiclePresetId === presetId;
                const labelInfo = t.presets[presetId];
                return (
                  <button
                    key={presetId}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => onPresetSelect(presetId)}
                    className={`min-h-[56px] cursor-pointer rounded border px-3 py-2.5 text-left transition-colors duration-150 ${
                      selected
                        ? 'border-[#005ea2] bg-[#eef5fb] dark:border-[#4ea8ff] dark:bg-[#16273a]'
                        : 'border-[#c6cace] bg-white hover:bg-[#f8f9fa] dark:border-[#3b4757] dark:bg-[#11161d] dark:hover:bg-[#19212c]'
                    }`}
                  >
                    <span className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
                      {labelInfo.name}
                    </span>
                    <span className="mt-0.5 block text-xs text-[#565c65] dark:text-[#a9b4c2]">
                      {labelInfo.detail}
                    </span>
                  </button>
                );
              })}
            </div>
            <p className="mt-2 font-mono text-xs tabular-nums text-[#565c65] dark:text-[#a9b4c2]">
              C(v) = {activePreset.baseLPer100Km.toFixed(3)} +{' '}
              {activePreset.dragFactor.toFixed(6)} × v² (L/100km)
            </p>
          </div>
        ) : (
          /* Manual Mode Inputs */
          <div className="space-y-4">
            <p id="hint-cons" className="text-xs text-[#565c65] dark:text-[#a9b4c2]">
              {isMetric ? t.consHintMetric : t.consHintImperial}
            </p>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="input-cons1"
                  className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
                >
                  {t.cons1Label}
                </label>
                <div className="mt-1.5 flex">
                  <input
                    id="input-cons1"
                    type="number"
                    inputMode="decimal"
                    min="0.1"
                    step="0.1"
                    value={inputs.manualCons1}
                    aria-describedby={
                      errors.manualCons1 ? 'hint-cons err-cons1' : 'hint-cons'
                    }
                    aria-invalid={Boolean(errors.manualCons1)}
                    onChange={(e) => onChange({ manualCons1: e.target.value })}
                    className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                      errors.manualCons1
                        ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                        : 'border-[#565c65] bg-white dark:border-[#526072]'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3 text-xs font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
                  >
                    {consUnit}
                  </span>
                </div>
                {errors.manualCons1 && (
                  <p
                    id="err-cons1"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#b50909] dark:text-[#ff8080]"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      {isMetric ? t.errConsumptionMetric : t.errConsumptionImperial}
                    </span>
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="input-cons2"
                  className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
                >
                  {t.cons2Label}
                </label>
                <div className="mt-1.5 flex">
                  <input
                    id="input-cons2"
                    type="number"
                    inputMode="decimal"
                    min="0.1"
                    step="0.1"
                    value={inputs.manualCons2}
                    aria-describedby={
                      errors.manualCons2 ? 'hint-cons err-cons2' : 'hint-cons'
                    }
                    aria-invalid={Boolean(errors.manualCons2)}
                    onChange={(e) => onChange({ manualCons2: e.target.value })}
                    className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                      errors.manualCons2
                        ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                        : 'border-[#565c65] bg-white dark:border-[#526072]'
                    }`}
                  />
                  <span
                    aria-hidden="true"
                    className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3 text-xs font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
                  >
                    {consUnit}
                  </span>
                </div>
                {errors.manualCons2 && (
                  <p
                    id="err-cons2"
                    role="alert"
                    className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#b50909] dark:text-[#ff8080]"
                  >
                    <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    <span>
                      {isMetric ? t.errConsumptionMetric : t.errConsumptionImperial}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        <hr className="border-[#dfe1e2] dark:border-[#2e3846]" />

        {/* Fuel Type & Price */}
        <div className="space-y-4">
          <fieldset>
            <legend className="text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]">
              {t.fuelTypeTitle}
            </legend>
            <p className="mt-0.5 text-xs text-[#565c65] dark:text-[#a9b4c2]">
              {t.fuelTypeHint}
            </p>
            <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
              {(['petrol', 'diesel'] as FuelType[]).map((ft) => {
                const selected = inputs.fuelType === ft;
                return (
                  <label
                    key={ft}
                    className={`flex min-h-[44px] cursor-pointer items-center gap-2.5 rounded border px-3 py-2 text-sm font-semibold transition-colors duration-150 ${
                      selected
                        ? 'border-[#005ea2] bg-[#eef5fb] text-[#162e51] dark:border-[#4ea8ff] dark:bg-[#16273a] dark:text-[#f0f4f8]'
                        : 'border-[#c6cace] bg-white text-[#1b1b1b] hover:bg-[#f8f9fa] dark:border-[#3b4757] dark:bg-[#11161d] dark:text-[#d1dae5] dark:hover:bg-[#19212c]'
                    }`}
                  >
                    <input
                      type="radio"
                      name="fuelType"
                      value={ft}
                      checked={selected}
                      onChange={() => onChange({ fuelType: ft })}
                      className="h-4 w-4 accent-[#005ea2]"
                    />
                    <span>{t.fuelTypes[ft]}</span>
                  </label>
                );
              })}
            </div>
          </fieldset>

          <div>
            <label
              htmlFor="input-fuel-price"
              className="block text-sm font-bold text-[#1b1b1b] dark:text-[#f0f4f8]"
            >
              {isMetric ? t.fuelPriceLabelMetric : t.fuelPriceLabelImperial}
            </label>
            <p
              id="hint-price"
              className="mt-0.5 text-xs text-[#565c65] dark:text-[#a9b4c2]"
            >
              {t.fuelPriceHint}
            </p>
            <div className="mt-1.5 flex">
              <input
                id="input-fuel-price"
                type="number"
                inputMode="decimal"
                min="0"
                step="0.01"
                value={inputs.fuelPrice}
                aria-describedby={
                  errors.fuelPrice ? 'hint-price err-price' : 'hint-price'
                }
                aria-invalid={Boolean(errors.fuelPrice)}
                onChange={(e) => onChange({ fuelPrice: e.target.value })}
                className={`min-h-[44px] w-full rounded-l border px-3 py-2 font-mono text-base tabular-nums text-[#1b1b1b] dark:bg-[#11161d] dark:text-[#f0f4f8] ${
                  errors.fuelPrice
                    ? 'border-[#b50909] bg-[#fff5f5] dark:border-[#ff6b6b] dark:bg-[#2a1518]'
                    : 'border-[#565c65] bg-white dark:border-[#526072]'
                }`}
              />
              <span
                aria-hidden="true"
                className="inline-flex min-h-[44px] items-center rounded-r border border-l-0 border-[#565c65] bg-[#f0f0f0] px-3.5 text-sm font-bold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#26303d] dark:text-[#e2e8f0]"
              >
                {currencySymbol}/{volUnit}
              </span>
            </div>
            {errors.fuelPrice && (
              <p
                id="err-price"
                role="alert"
                className="mt-1.5 flex items-center gap-1.5 text-xs font-semibold text-[#b50909] dark:text-[#ff8080]"
              >
                <AlertCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                <span>{t.errPrice}</span>
              </p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
