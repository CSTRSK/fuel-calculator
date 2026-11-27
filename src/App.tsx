/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useMemo, useState } from 'react';
import { ComparisonTable } from './components/ComparisonTable';
import { Header } from './components/Header';
import { MethodologyAccordion } from './components/MethodologyAccordion';
import { ResultsOverview } from './components/ResultsOverview';
import { SpeedCurveChart } from './components/SpeedCurveChart';
import { TripForm } from './components/TripForm';
import { TRANSLATIONS } from './data/translations';
import type {
  ConsumptionMode,
  CurrencyCode,
  Locale,
  ThemeMode,
  TripInputs,
  UnitSystem,
  UserPreferences,
  VehiclePresetId,
} from './types/calculator';
import {
  calculateTripAnalysis,
  convertInputsUnitSystem,
  CURRENCY_META,
  getDefaultInputs,
  LITERS_PER_US_GALLON,
  VEHICLE_PRESETS,
} from './utils/calculations';

const PREFS_STORAGE_KEY = 'uswds_travel_calc_prefs_v1';

function detectInitialLocale(): Locale {
  if (typeof navigator === 'undefined') return 'en';
  const lang = navigator.language.slice(0, 2).toLowerCase();
  if (lang === 'de' || lang === 'en' || lang === 'es' || lang === 'fr' || lang === 'tr') {
    return lang;
  }
  return 'en';
}

function loadInitialPreferences(): UserPreferences {
  const defaultLocale = detectInitialLocale();
  const defaultCurrency: CurrencyCode =
    defaultLocale === 'tr' ? 'TRY' : defaultLocale === 'en' ? 'USD' : 'EUR';
  const defaultUnits: UnitSystem =
    typeof navigator !== 'undefined' && navigator.language === 'en-US'
      ? 'imperial'
      : 'metric';

  const fallback: UserPreferences = {
    locale: defaultLocale,
    unitSystem: defaultUnits,
    currency: defaultCurrency,
    theme: 'light',
  };

  if (typeof window === 'undefined') return fallback;

  try {
    const raw = window.localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw) as Partial<UserPreferences>;
    return {
      locale:
        parsed.locale && ['de', 'en', 'es', 'fr', 'tr'].includes(parsed.locale)
          ? parsed.locale
          : fallback.locale,
      unitSystem:
        parsed.unitSystem === 'imperial' || parsed.unitSystem === 'metric'
          ? parsed.unitSystem
          : fallback.unitSystem,
      currency:
        parsed.currency &&
        ['EUR', 'USD', 'GBP', 'CHF', 'TRY'].includes(parsed.currency)
          ? parsed.currency
          : fallback.currency,
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
    };
  } catch {
    return fallback;
  }
}

export default function App() {
  const [prefs, setPrefs] = useState<UserPreferences>(loadInitialPreferences);
  const [inputs, setInputs] = useState<TripInputs>(() =>
    getDefaultInputs(prefs.unitSystem, prefs.currency)
  );
  const [statusMessage, setStatusMessage] = useState<string>('');

  const t = TRANSLATIONS[prefs.locale];

  // Persist preferences & synchronize theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (prefs.theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
    try {
      window.localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(prefs));
    } catch {
      // Ignore storage quota / privacy mode errors
    }
  }, [prefs]);

  // Synchronize document SEO metadata, lang attribute, canonical URL, and JSON-LD
  useEffect(() => {
    document.documentElement.lang = prefs.locale;
    document.title = t.seoTitle;

    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector);
      if (el) el.setAttribute('content', content);
    };

    setMeta('meta[name="description"]', t.seoDescription);
    setMeta('meta[property="og:title"]', t.seoTitle);
    setMeta('meta[property="og:description"]', t.seoDescription);
    setMeta('meta[name="twitter:title"]', t.seoTitle);
    setMeta('meta[name="twitter:description"]', t.seoDescription);

    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const canonicalEl = document.getElementById('canonical-link');
    if (canonicalEl) {
      canonicalEl.setAttribute('href', canonicalUrl);
    }

    const ldScript = document.getElementById('ld-json-webapp');
    if (ldScript) {
      ldScript.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: t.brandTitle,
        description: t.seoDescription,
        url: canonicalUrl,
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'All',
        inLanguage: prefs.locale,
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: prefs.currency,
        },
      });
    }
  }, [prefs.locale, prefs.currency, t]);

  const result = useMemo(
    () => calculateTripAnalysis(inputs, prefs.unitSystem),
    [inputs, prefs.unitSystem]
  );

  const handleInputsChange = (patch: Partial<TripInputs>) => {
    setInputs((prev) => ({ ...prev, ...patch }));
  };

  const handleLocaleChange = (locale: Locale) => {
    setPrefs((prev) => ({ ...prev, locale }));
  };

  const handleUnitSystemChange = (nextSystem: UnitSystem) => {
    if (nextSystem === prefs.unitSystem) return;
    setInputs((prev) => convertInputsUnitSystem(prev, prefs.unitSystem, nextSystem));
    setPrefs((prev) => ({ ...prev, unitSystem: nextSystem }));
  };

  const handleCurrencyChange = (nextCurrency: CurrencyCode) => {
    setPrefs((prev) => ({ ...prev, currency: nextCurrency }));
    const metricDefault = CURRENCY_META[nextCurrency].defaultMetricPrice;
    const nextPrice =
      prefs.unitSystem === 'imperial'
        ? (metricDefault * LITERS_PER_US_GALLON).toFixed(2)
        : metricDefault.toFixed(2);
    setInputs((prev) => ({ ...prev, fuelPrice: nextPrice }));
  };

  const handleThemeToggle = () => {
    setPrefs((prev) => ({
      ...prev,
      theme: prev.theme === 'dark' ? 'light' : 'dark',
    }));
  };

  const handlePresetSelect = (presetId: VehiclePresetId) => {
    const preset = VEHICLE_PRESETS[presetId];
    setInputs((prev) => ({
      ...prev,
      vehiclePresetId: presetId,
      fuelType: preset.defaultFuelType,
    }));
  };

  const handleModeChange = (mode: ConsumptionMode) => {
    if (mode === 'manual' && result.isValid) {
      setInputs((prev) => ({
        ...prev,
        consumptionMode: 'manual',
        manualCons1: result.cons1Display.toFixed(1),
        manualCons2: result.cons2Display.toFixed(1),
      }));
    } else {
      setInputs((prev) => ({ ...prev, consumptionMode: mode }));
    }
  };

  const handleSwapSpeeds = () => {
    setInputs((prev) => ({
      ...prev,
      speed1: prev.speed2,
      speed2: prev.speed1,
      manualCons1: prev.manualCons2,
      manualCons2: prev.manualCons1,
    }));
  };

  const handleReset = () => {
    setInputs(getDefaultInputs(prefs.unitSystem, prefs.currency));
    setStatusMessage(t.resetAnnouncement);
    window.setTimeout(() => setStatusMessage(''), 3000);
  };

  return (
    <div
      id="top"
      className="flex min-h-screen flex-col bg-[#f8f9fa] text-[#1b1b1b] transition-colors duration-150 dark:bg-[#11161d] dark:text-[#f0f4f8]"
    >
      <Header
        t={t}
        locale={prefs.locale}
        unitSystem={prefs.unitSystem}
        currency={prefs.currency}
        theme={prefs.theme}
        onLocaleChange={handleLocaleChange}
        onUnitSystemChange={handleUnitSystemChange}
        onCurrencyChange={handleCurrencyChange}
        onThemeToggle={handleThemeToggle}
        onReset={handleReset}
      />

      {/* Polite status announcements (e.g. Reset confirmation) */}
      <div className="sr-only" role="status" aria-live="polite">
        {statusMessage}
      </div>

      <main
        id="main-content"
        tabIndex={-1}
        className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6 lg:px-8"
      >
        {/* Page Title Header */}
        <div className="mb-8 max-w-3xl">
          <h1 className="text-[clamp(1.75rem,3vw,2.5rem)] font-bold leading-tight tracking-tight text-[#162e51] dark:text-[#f0f4f8]">
            {t.pageTitle}
          </h1>
          <p className="mt-2.5 text-base leading-relaxed text-[#3d4551] dark:text-[#b8c4d4]">
            {t.pageSubtitle}
          </p>
        </div>

        {/* 12-Column Responsive CSS Grid */}
        <div
          id="calculator-section"
          className="grid grid-cols-1 items-start gap-6 lg:grid-cols-12"
        >
          {/* Left 5 Columns: Trip & Vehicle Parameter Inputs */}
          <div className="lg:col-span-5">
            <TripForm
              t={t}
              inputs={inputs}
              errors={result.errors}
              unitSystem={prefs.unitSystem}
              currency={prefs.currency}
              onChange={handleInputsChange}
              onPresetSelect={handlePresetSelect}
              onModeChange={handleModeChange}
              onSwapSpeeds={handleSwapSpeeds}
            />
          </div>

          {/* Right 7 Columns: Live Analysis, Curves & Comparison */}
          <div className="space-y-6 lg:col-span-7">
            <ResultsOverview
              t={t}
              result={result}
              locale={prefs.locale}
              unitSystem={prefs.unitSystem}
              currency={prefs.currency}
            />

            <SpeedCurveChart
              t={t}
              result={result}
              locale={prefs.locale}
              unitSystem={prefs.unitSystem}
              currency={prefs.currency}
              consumptionMode={inputs.consumptionMode}
            />
          </div>
        </div>

        {/* Full-Width Structured Comparison Table & Methodology */}
        <div className="mt-6 space-y-6">
          <ComparisonTable
            t={t}
            result={result}
            locale={prefs.locale}
            unitSystem={prefs.unitSystem}
            currency={prefs.currency}
          />

          <MethodologyAccordion t={t} />
        </div>
      </main>

      {/* Clean Accessible USWDS Footer with Legal Links */}
      <footer className="mt-12 border-t border-[#dfe1e2] bg-white dark:border-[#2a3441] dark:bg-[#171e27]">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-4 py-6 text-sm text-[#565c65] sm:px-6 lg:px-8 dark:text-[#a9b4c2]">
          <div className="space-y-1">
            <p>{t.footerNote}</p>
            <p className="text-xs">{t.footerAccessibility}</p>
          </div>
          <a
            href="#top"
            className="inline-flex min-h-[44px] items-center font-semibold text-[#005ea2] underline underline-offset-4 hover:text-[#1a4480] dark:text-[#73b3e7] dark:hover:text-[#a1cff4]"
          >
            {t.footerBackToTop}
          </a>
        </div>

        {/* cstrsk-recht: Impressum & Datenschutz */}
        <div className="cstrsk-recht border-t border-[#dfe1e2] bg-[#f0f0f0] dark:border-[#2a3441] dark:bg-[#11161d]">
          <nav
            aria-label={t.footerLegalNavLabel}
            className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-center gap-2 px-4 py-2 text-xs text-[#3d4551] sm:px-6 lg:px-8 dark:text-[#b8c4d4]"
          >
            <a
              href="https://cstrsk.de/"
              className="inline-flex min-h-[44px] items-center px-2 py-2 font-semibold underline underline-offset-4 hover:text-[#005ea2] dark:hover:text-[#73b3e7]"
            >
              cstrsk.de
            </a>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <a
              href="https://cstrsk.de/Impressum.html"
              className="inline-flex min-h-[44px] items-center px-2 py-2 underline underline-offset-4 hover:text-[#005ea2] dark:hover:text-[#73b3e7]"
            >
              {t.footerImprint}
            </a>
            <span aria-hidden="true" className="opacity-50">
              ·
            </span>
            <a
              href="https://cstrsk.de/dsvgo.html"
              className="inline-flex min-h-[44px] items-center px-2 py-2 underline underline-offset-4 hover:text-[#005ea2] dark:hover:text-[#73b3e7]"
            >
              {t.footerPrivacy}
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
