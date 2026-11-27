import { Moon, RotateCcw, Sun } from 'lucide-react';
import type { TranslationDictionary } from '../data/translations';
import { LANGUAGE_OPTIONS } from '../data/translations';
import type {
  CurrencyCode,
  Locale,
  ThemeMode,
  UnitSystem,
} from '../types/calculator';
import { CURRENCY_META } from '../utils/calculations';

interface HeaderProps {
  t: TranslationDictionary;
  locale: Locale;
  unitSystem: UnitSystem;
  currency: CurrencyCode;
  theme: ThemeMode;
  onLocaleChange: (locale: Locale) => void;
  onUnitSystemChange: (unitSystem: UnitSystem) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
  onThemeToggle: () => void;
  onReset: () => void;
}

const CURRENCY_LIST: CurrencyCode[] = ['EUR', 'USD', 'GBP', 'CHF', 'TRY'];

export function Header({
  t,
  locale,
  unitSystem,
  currency,
  theme,
  onLocaleChange,
  onUnitSystemChange,
  onCurrencyChange,
  onThemeToggle,
  onReset,
}: HeaderProps) {
  return (
    <>
      <a href="#main-content" className="skip-link">
        {t.skipToMain}
      </a>

      {/* Clean 3-zone USWDS Header */}
      <header className="border-b border-[#dfe1e2] bg-white dark:border-[#2a3441] dark:bg-[#11161d]">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-3 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
          {/* Zone 1: Single-line Brand Wordmark */}
          <a
            href="#top"
            className="min-w-0 shrink truncate text-lg font-bold tracking-tight text-[#162e51] hover:text-[#005ea2] dark:text-[#f0f4f8] dark:hover:text-[#73b3e7]"
          >
            {t.brandTitle}
          </a>

          {/* Zone 2: 4 single-line Navigation Links */}
          <nav
            aria-label="Primary"
            className="hidden items-center gap-6 text-sm font-semibold text-[#3d4551] md:flex dark:text-[#c7d1dd]"
          >
            <a
              href="#calculator-section"
              className="shrink-0 whitespace-nowrap py-2 underline-offset-4 hover:text-[#005ea2] hover:underline dark:hover:text-[#73b3e7]"
            >
              {t.navCalculator}
            </a>
            <a
              href="#curves-section"
              className="shrink-0 whitespace-nowrap py-2 underline-offset-4 hover:text-[#005ea2] hover:underline dark:hover:text-[#73b3e7]"
            >
              {t.navCurves}
            </a>
            <a
              href="#comparison-section"
              className="shrink-0 whitespace-nowrap py-2 underline-offset-4 hover:text-[#005ea2] hover:underline dark:hover:text-[#73b3e7]"
            >
              {t.navComparison}
            </a>
            <a
              href="#methodology-section"
              className="shrink-0 whitespace-nowrap py-2 underline-offset-4 hover:text-[#005ea2] hover:underline dark:hover:text-[#73b3e7]"
            >
              {t.navMethodology}
            </a>
          </nav>

          {/* Zone 3: Single Primary Action */}
          <div className="shrink-0">
            <button
              type="button"
              onClick={onReset}
              className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded bg-[#005ea2] px-4 py-2 text-sm font-bold text-white transition-colors duration-150 hover:bg-[#1a4480] active:bg-[#162e51] dark:bg-[#2b7cd3] dark:hover:bg-[#3c8ee5]"
            >
              <RotateCcw className="h-4 w-4" aria-hidden="true" />
              <span>{t.resetDefaults}</span>
            </button>
          </div>
        </div>
      </header>

      {/* International & Display Workspace Settings Bar */}
      <section
        aria-label={t.settingsRegionLabel}
        className="border-b border-[#dfe1e2] bg-[#f0f0f0] dark:border-[#2a3441] dark:bg-[#171e27]"
      >
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            {/* Language Select */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="pref-language"
                className="text-sm font-semibold text-[#1b1b1b] dark:text-[#e2e8f0]"
              >
                {t.languageLabel}
              </label>
              <select
                id="pref-language"
                value={locale}
                onChange={(e) => onLocaleChange(e.target.value as Locale)}
                className="min-h-[44px] cursor-pointer rounded border border-[#565c65] bg-white px-3 py-1.5 text-sm font-semibold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#11161d] dark:text-[#f0f4f8]"
              >
                {LANGUAGE_OPTIONS.map((lang) => (
                  <option key={lang.code} value={lang.code}>
                    {lang.nativeName}
                  </option>
                ))}
              </select>
            </div>

            {/* Unit System Segmented Buttons */}
            <div
              role="group"
              aria-label={t.unitSystemLabel}
              className="inline-flex flex-wrap rounded border border-[#565c65] bg-white p-0.5 dark:border-[#526072] dark:bg-[#11161d]"
            >
              <button
                type="button"
                aria-pressed={unitSystem === 'metric'}
                onClick={() => onUnitSystemChange('metric')}
                className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                  unitSystem === 'metric'
                    ? 'bg-[#005ea2] text-white dark:bg-[#2b7cd3]'
                    : 'text-[#1b1b1b] hover:bg-[#e6f0f8] dark:text-[#d1dae5] dark:hover:bg-[#1e2936]'
                }`}
              >
                {t.unitMetric}
              </button>
              <button
                type="button"
                aria-pressed={unitSystem === 'imperial'}
                onClick={() => onUnitSystemChange('imperial')}
                className={`min-h-[44px] cursor-pointer whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-semibold transition-colors duration-150 ${
                  unitSystem === 'imperial'
                    ? 'bg-[#005ea2] text-white dark:bg-[#2b7cd3]'
                    : 'text-[#1b1b1b] hover:bg-[#e6f0f8] dark:text-[#d1dae5] dark:hover:bg-[#1e2936]'
                }`}
              >
                {t.unitImperial}
              </button>
            </div>

            {/* Currency Select */}
            <div className="flex items-center gap-2">
              <label
                htmlFor="pref-currency"
                className="text-sm font-semibold text-[#1b1b1b] dark:text-[#e2e8f0]"
              >
                {t.currencyLabel}
              </label>
              <select
                id="pref-currency"
                value={currency}
                onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
                className="min-h-[44px] cursor-pointer rounded border border-[#565c65] bg-white px-3 py-1.5 text-sm font-semibold text-[#1b1b1b] dark:border-[#526072] dark:bg-[#11161d] dark:text-[#f0f4f8]"
              >
                {CURRENCY_LIST.map((code) => (
                  <option key={code} value={code}>
                    {CURRENCY_META[code].label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={onThemeToggle}
            aria-pressed={theme === 'dark'}
            aria-label={`${t.themeLabel}: ${theme === 'dark' ? t.themeDark : t.themeLight}`}
            className="inline-flex min-h-[44px] shrink-0 cursor-pointer items-center gap-2 whitespace-nowrap rounded border border-[#565c65] bg-white px-3.5 py-2 text-sm font-semibold text-[#1b1b1b] transition-colors duration-150 hover:bg-[#e6f0f8] dark:border-[#526072] dark:bg-[#11161d] dark:text-[#f0f4f8] dark:hover:bg-[#222d3b]"
          >
            {theme === 'dark' ? (
              <>
                <Sun className="h-4 w-4 text-[#f5c242]" aria-hidden="true" />
                <span>{t.themeLight}</span>
              </>
            ) : (
              <>
                <Moon className="h-4 w-4 text-[#162e51]" aria-hidden="true" />
                <span>{t.themeDark}</span>
              </>
            )}
          </button>
        </div>
      </section>
    </>
  );
}
