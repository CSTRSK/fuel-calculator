import type { FuelType, Locale, VehiclePresetId } from '../types/calculator';

export interface TranslationDictionary {
  seoTitle: string;
  seoDescription: string;
  skipToMain: string;
  brandTitle: string;
  navCalculator: string;
  navCurves: string;
  navComparison: string;
  navMethodology: string;
  resetDefaults: string;
  resetAnnouncement: string;

  // Settings bar
  settingsRegionLabel: string;
  languageLabel: string;
  unitSystemLabel: string;
  unitMetric: string;
  unitImperial: string;
  currencyLabel: string;
  themeLabel: string;
  themeLight: string;
  themeDark: string;

  // Hero / Page header
  pageTitle: string;
  pageSubtitle: string;

  // Form section
  tripParamsTitle: string;
  tripParamsDesc: string;
  distanceLabel: string;
  distanceHintMetric: string;
  distanceHintImperial: string;
  speed1Label: string;
  speed2Label: string;
  speedHintMetric: string;
  speedHintImperial: string;
  swapSpeeds: string;

  fuelTypeTitle: string;
  fuelTypes: Record<FuelType, string>;
  fuelTypeHint: string;

  consumptionModeTitle: string;
  consumptionModeHint: string;
  modeAutoLabel: string;
  modeAutoDesc: string;
  modeManualLabel: string;
  modeManualDesc: string;

  vehiclePresetLabel: string;
  presets: Record<VehiclePresetId, { name: string; detail: string }>;

  cons1Label: string;
  cons2Label: string;
  consHintMetric: string;
  consHintImperial: string;

  fuelPriceTitle: string;
  fuelPriceLabelMetric: string;
  fuelPriceLabelImperial: string;
  fuelPriceHint: string;

  // Validation errors
  errDistance: string;
  errSpeedMetric: string;
  errSpeedImperial: string;
  errConsumptionMetric: string;
  errConsumptionImperial: string;
  errPrice: string;
  validationBanner: string;

  // Units
  unitDistanceMetric: string;
  unitDistanceImperial: string;
  unitSpeedMetric: string;
  unitSpeedImperial: string;
  unitConsMetric: string;
  unitConsImperial: string;
  unitVolumeMetric: string;
  unitVolumeImperial: string;
  unitCo2Metric: string;
  unitCo2Imperial: string;
  unitHourShort: string;
  unitMinShort: string;

  // Results overview
  resultsTitle: string;
  kpiTimeTitle: string;
  kpiFuelTitle: string;
  kpiCostTitle: string;
  kpiCo2Title: string;
  statusTimeSaved: string;
  statusTimeLost: string;
  statusEqual: string;
  statusMoreFuel: string;
  statusLessFuel: string;
  statusMoreCost: string;
  statusLessCost: string;
  statusMoreCo2: string;
  statusLessCo2: string;

  timeBarTitle: string;
  timeBarSavedDesc: string;
  timeBarLostDesc: string;
  timeBarEqualDesc: string;
  timeAt: string;

  economicVerdictTitle: string;
  costPerSavedHourLabel: string;
  savingsPerExtraHourLabel: string;
  equalSpeedsVerdict: string;
  economicHintFaster: string;
  economicHintSlower: string;

  co2ImpactTitle: string;
  co2AnnualLabel: string;
  co2TreesLabel: string;
  co2TreesUnit: string;
  co2AnnualBasis: string;

  // Chart section
  chartTitle: string;
  chartSubtitle: string;
  chartManualNotice: string;
  chartMetricConsumption: string;
  chartMetricCost: string;
  chartMetricCo2: string;
  chartAxisSpeed: string;
  chartHoverHint: string;
  chartMarkerV1: string;
  chartMarkerV2: string;
  chartInspectSpeed: string;
  chartInspectTime: string;

  // Comparison table
  tableTitle: string;
  tableCaption: string;
  tableColMetric: string;
  tableColSpeed1: string;
  tableColSpeed2: string;
  tableColDiff: string;
  rowTravelTime: string;
  rowConsumptionRate: string;
  rowTotalFuel: string;
  rowTotalCost: string;
  rowCo2Emissions: string;

  // Methodology accordion
  methodologyTitle: string;
  methodologySubtitle: string;
  methodDragTitle: string;
  methodDragBody: string;
  methodCo2Title: string;
  methodCo2Body: string;
  methodUnitsTitle: string;
  methodUnitsBody: string;

  // Footer
  footerNote: string;
  footerAccessibility: string;
  footerBackToTop: string;
  footerLegalNavLabel: string;
  footerImprint: string;
  footerPrivacy: string;
}

export const TRANSLATIONS: Record<Locale, TranslationDictionary> = {
  de: {
    seoTitle: 'Reisezeit- & Kraftstoff-Rechner – Tempo, Kosten & CO₂ vergleichen',
    seoDescription:
      'Vergleichen Sie Fahrgeschwindigkeiten, Reisezeitersparnis, Kraftstoffverbrauch, Fahrtkosten und CO₂-Ausstoß metrisch oder imperial – barrierefrei im USWDS-Design.',
    skipToMain: 'Direkt zum Hauptinhalt springen',
    brandTitle: 'Reisezeit- & Kraftstoff-Rechner',
    navCalculator: 'Rechner',
    navCurves: 'Kennlinien',
    navComparison: 'Vergleich',
    navMethodology: 'Methodik',
    resetDefaults: 'Zurücksetzen',
    resetAnnouncement: 'Eingaben wurden auf die Standardwerte zurückgesetzt.',

    settingsRegionLabel: 'Sprach-, Einheiten- und Darstellungseinstellungen',
    languageLabel: 'Sprache',
    unitSystemLabel: 'Einheiten',
    unitMetric: 'Metrisch (km, L)',
    unitImperial: 'Imperial (mi, gal)',
    currencyLabel: 'Währung',
    themeLabel: 'Darstellung',
    themeLight: 'Hell',
    themeDark: 'Dunkel',

    pageTitle: 'Reisezeit-, Kraftstoff- & CO₂-Rechner',
    pageSubtitle:
      'Analysieren Sie objektiv, wie sich zwei Reisegeschwindigkeiten auf Fahrzeit, Verbrauch, Gesamtkosten und CO₂-Bilanz auswirken.',

    tripParamsTitle: 'Fahrt- und Fahrzeugparameter',
    tripParamsDesc: 'Alle Ergebnisse aktualisieren sich unmittelbar bei jeder Eingabe.',
    distanceLabel: 'Streckenlänge',
    distanceHintMetric: 'Einfache Strecke in Kilometern (z. B. 100 km).',
    distanceHintImperial: 'Einfache Strecke in Meilen (z. B. 62 mi).',
    speed1Label: 'Vergleichstempo 1',
    speed2Label: 'Vergleichstempo 2',
    speedHintMetric: 'Durchschnittsgeschwindigkeit zwischen 5 und 350 km/h.',
    speedHintImperial: 'Durchschnittsgeschwindigkeit zwischen 5 und 220 mph.',
    swapSpeeds: 'Tempos tauschen',

    fuelTypeTitle: 'Kraftstoffart (für CO₂-Bilanz)',
    fuelTypes: {
      petrol: 'Benzin (2,31 kg CO₂/L)',
      diesel: 'Diesel (2,64 kg CO₂/L)',
    },
    fuelTypeHint: 'Bestimmt den Emissionsfaktor für die Berechnung des CO₂-Ausstoßes.',

    consumptionModeTitle: 'Verbrauchsmodell',
    consumptionModeHint:
      'Wählen Sie das physikalische Luftwiderstandsmodell mit Fahrzeugklasse oder tragen Sie eigene Bordcomputer-Werte ein.',
    modeAutoLabel: 'Auto-Modell (Luftwiderstand + Preset)',
    modeAutoDesc: 'Berechnet den Verbrauch über das quadratische Luftwiderstandsmodell.',
    modeManualLabel: 'Manuelle Eingabe',
    modeManualDesc: 'Eigene Verbrauchswerte für Tempo 1 und Tempo 2 eingeben.',

    vehiclePresetLabel: 'Fahrzeugklasse (Preset)',
    presets: {
      compact: { name: 'Kleinwagen / Kompakt', detail: 'Benzin · geringer Luftwiderstand' },
      sedan: { name: 'Mittelklasse-Limousine', detail: 'Benzin · Standardmodell' },
      diesel_wagon: { name: 'Kombi / Reiselimousine', detail: 'Diesel · langstreckenoptimiert' },
      suv: { name: 'SUV / Crossover', detail: 'Benzin · größere Stirnfläche' },
    },

    cons1Label: 'Verbrauch bei Tempo 1',
    cons2Label: 'Verbrauch bei Tempo 2',
    consHintMetric: 'Durchschnittsverbrauch in L/100km (z. B. 6,0).',
    consHintImperial: 'Reichweite in US-Meilen pro Gallone (MPG, z. B. 39,2).',

    fuelPriceTitle: 'Kraftstoffpreis',
    fuelPriceLabelMetric: 'Preis pro Liter',
    fuelPriceLabelImperial: 'Preis pro US-Gallone',
    fuelPriceHint: 'Aktueller Tankstellenpreis in der gewählten Währung.',

    errDistance: 'Bitte geben Sie eine gültige Strecke größer als 0 ein.',
    errSpeedMetric: 'Bitte geben Sie eine Geschwindigkeit zwischen 5 und 350 km/h ein.',
    errSpeedImperial: 'Bitte geben Sie eine Geschwindigkeit zwischen 5 und 220 mph ein.',
    errConsumptionMetric: 'Bitte geben Sie einen Verbrauch zwischen 0,1 und 60 L/100km ein.',
    errConsumptionImperial: 'Bitte geben Sie einen Wert zwischen 1 und 200 MPG ein.',
    errPrice: 'Bitte geben Sie einen gültigen Preis ab 0 ein.',
    validationBanner:
      'Bitte korrigieren Sie die markierten Eingabefelder, um die Analyse anzuzeigen.',

    unitDistanceMetric: 'km',
    unitDistanceImperial: 'mi',
    unitSpeedMetric: 'km/h',
    unitSpeedImperial: 'mph',
    unitConsMetric: 'L/100km',
    unitConsImperial: 'MPG',
    unitVolumeMetric: 'L',
    unitVolumeImperial: 'gal',
    unitCo2Metric: 'kg CO₂',
    unitCo2Imperial: 'lb CO₂',
    unitHourShort: 'Std.',
    unitMinShort: 'Min.',

    resultsTitle: 'Ergebnisübersicht',
    kpiTimeTitle: 'Zeitdifferenz',
    kpiFuelTitle: 'Kraftstoffdifferenz',
    kpiCostTitle: 'Kostendifferenz',
    kpiCo2Title: 'CO₂-Differenz',
    statusTimeSaved: 'Zeitersparnis (Tempo 2)',
    statusTimeLost: 'Zeitverlust (Tempo 2)',
    statusEqual: 'Kein Unterschied',
    statusMoreFuel: 'Mehrverbrauch (Tempo 2)',
    statusLessFuel: 'Einsparung (Tempo 2)',
    statusMoreCost: 'Mehrkosten (Tempo 2)',
    statusLessCost: 'Ersparnis (Tempo 2)',
    statusMoreCo2: 'Mehrausstoß (Tempo 2)',
    statusLessCo2: 'Einsparung (Tempo 2)',

    timeBarTitle: 'Relative Veränderung der Reisezeit',
    timeBarSavedDesc: 'Tempo 2 verkürzt die Fahrzeit um',
    timeBarLostDesc: 'Tempo 2 verlängert die Fahrzeit um',
    timeBarEqualDesc: 'Beide Geschwindigkeiten ergeben eine identische Fahrzeit.',
    timeAt: 'Fahrzeit bei',

    economicVerdictTitle: 'Wirtschaftliche Bewertung (Zeit vs. Kosten)',
    costPerSavedHourLabel: 'Kosten pro gesparter Stunde',
    savingsPerExtraHourLabel: 'Ersparnis pro zusätzlicher Fahrstunde',
    equalSpeedsVerdict: 'Wählen Sie zwei unterschiedliche Geschwindigkeiten für den Vergleich.',
    economicHintFaster:
      'Entspricht dem effektiven Stundenpreis für die durch Tempo 2 gewonnene Zeit.',
    economicHintSlower:
      'So viel Kraftstoffkosten sparen Sie rechnerisch pro zusätzlich investierter Fahrstunde.',

    co2ImpactTitle: 'Jahres-CO₂-Einordnung (Pendler-Szenario)',
    co2AnnualLabel: 'CO₂-Differenz pro Jahr (200 Fahrten)',
    co2TreesLabel: 'Kompensationsbedarf',
    co2TreesUnit: 'ausgewachsene Bäume / Jahr',
    co2AnnualBasis: 'Basis: 22 kg CO₂-Aufnahme pro ausgewachsenem Baum und Jahr.',

    chartTitle: 'Geschwindigkeits-Kennlinie',
    chartSubtitle:
      'Verlauf nach dem quadratischen Luftwiderstandsmodell der gewählten Fahrzeugklasse.',
    chartManualNotice:
      'Hinweis: Die Kurve zeigt das physikalische Preset-Modell; die Punkte V1 und V2 markieren Ihre manuellen Werte.',
    chartMetricConsumption: 'Verbrauch',
    chartMetricCost: 'Fahrtkosten',
    chartMetricCo2: 'CO₂-Ausstoß',
    chartAxisSpeed: 'Geschwindigkeit',
    chartHoverHint: 'Punkt anklicken oder fokussieren für exakte Messwerte.',
    chartMarkerV1: 'Tempo 1',
    chartMarkerV2: 'Tempo 2',
    chartInspectSpeed: 'Gewähltes Tempo',
    chartInspectTime: 'Fahrzeit',

    tableTitle: 'Detailvergleich (Tempo 1 vs. Tempo 2)',
    tableCaption: 'Vollständiger Vergleich von Zeit, Verbrauch, Kosten und CO₂-Emissionen',
    tableColMetric: 'Kennzahl',
    tableColSpeed1: 'Tempo 1',
    tableColSpeed2: 'Tempo 2',
    tableColDiff: 'Differenz (V2 − V1)',
    rowTravelTime: 'Reisezeit',
    rowConsumptionRate: 'Spezifischer Verbrauch',
    rowTotalFuel: 'Gesamtverbrauch (Strecke)',
    rowTotalCost: 'Gesamtkosten (Strecke)',
    rowCo2Emissions: 'CO₂-Ausstoß (Strecke)',

    methodologyTitle: 'Methodik, Formeln & Umrechnungsfaktoren',
    methodologySubtitle: 'Transparente Berechnungsgrundlagen für nachvollziehbare Ergebnisse.',
    methodDragTitle: 'Quadratisches Luftwiderstandsmodell',
    methodDragBody:
      'Der Luftwiderstand steigt mit dem Quadrat der Geschwindigkeit. Das Modell berechnet den spezifischen Verbrauch als C(v) = c₀ + k · v² (in L/100km bei v in km/h). Für die Mittelklasse-Limousine entspricht dies der kalibrierten Referenzformel 3,273 + 0,000273 × v².',
    methodCo2Title: 'CO₂-Emissionsfaktoren (Tank-to-Wheel)',
    methodCo2Body:
      'Die direkten Verbrennungsemissionen betragen 2,31 kg CO₂ pro Liter Benzin und 2,64 kg CO₂ pro Liter Diesel (gemäß Umweltbundesamt / EPA-Standardwerten). Für das Jahres-Szenario werden 200 Fahrten pro Jahr angesetzt; ein ausgewachsener Baum bindet im Mittel ca. 22 kg CO₂ jährlich.',
    methodUnitsTitle: 'Internationale Einheiten-Konvertierung',
    methodUnitsBody:
      'Zwischen Metrisch und Imperial wird exakt umgerechnet: 1 Meile = 1,609344 km, 1 US-Gallone = 3,785412 L, 1 kg = 2,204623 lb und MPG (US) = 235,214583 ÷ (L/100km).',

    footerNote:
      'Alle Berechnungen erfolgen lokal im Browser ohne Tracking oder Datenübertragung.',
    footerAccessibility: 'Barrierefrei gestaltet nach WCAG 2.1 AA und USWDS-Prinzipien.',
    footerBackToTop: 'Nach oben',
    footerLegalNavLabel: 'Rechtliche Hinweise',
    footerImprint: 'Impressum',
    footerPrivacy: 'Datenschutz',
  },

  en: {
    seoTitle: 'Travel Time & Fuel Savings Calculator – Speed, Cost & CO₂',
    seoDescription:
      'Compare driving speeds, travel time savings, fuel consumption, trip cost, and CO₂ emissions in metric or imperial units with our accessible international calculator.',
    skipToMain: 'Skip to main content',
    brandTitle: 'Travel Time & Fuel Calculator',
    navCalculator: 'Calculator',
    navCurves: 'Speed Curves',
    navComparison: 'Comparison',
    navMethodology: 'Methodology',
    resetDefaults: 'Reset defaults',
    resetAnnouncement: 'Calculator inputs have been reset to default values.',

    settingsRegionLabel: 'Language, unit system, currency, and display settings',
    languageLabel: 'Language',
    unitSystemLabel: 'Units',
    unitMetric: 'Metric (km, L)',
    unitImperial: 'Imperial (mi, gal)',
    currencyLabel: 'Currency',
    themeLabel: 'Appearance',
    themeLight: 'Light',
    themeDark: 'Dark',

    pageTitle: 'Travel Time, Fuel & CO₂ Savings Calculator',
    pageSubtitle:
      'Evaluate how two cruising speeds affect trip duration, fuel burn, total cost, and carbon emissions with transparent physics.',

    tripParamsTitle: 'Trip & Vehicle Parameters',
    tripParamsDesc: 'All results update immediately as you adjust parameters.',
    distanceLabel: 'Trip distance',
    distanceHintMetric: 'One-way distance in kilometers (e.g., 100 km).',
    distanceHintImperial: 'One-way distance in miles (e.g., 62 mi).',
    speed1Label: 'Speed 1 (baseline)',
    speed2Label: 'Speed 2 (comparison)',
    speedHintMetric: 'Average speed between 5 and 350 km/h.',
    speedHintImperial: 'Average speed between 5 and 220 mph.',
    swapSpeeds: 'Swap speeds',

    fuelTypeTitle: 'Fuel type (for CO₂ balance)',
    fuelTypes: {
      petrol: 'Gasoline / Petrol (2.31 kg CO₂/L)',
      diesel: 'Diesel (2.64 kg CO₂/L)',
    },
    fuelTypeHint: 'Sets the direct combustion emission factor used for CO₂ totals.',

    consumptionModeTitle: 'Consumption model',
    consumptionModeHint:
      'Use the aerodynamic drag model with a vehicle preset or enter measured fuel economy manually.',
    modeAutoLabel: 'Auto model (Aerodynamic drag + preset)',
    modeAutoDesc: 'Estimates fuel economy via the quadratic aerodynamic drag equation.',
    modeManualLabel: 'Manual entry',
    modeManualDesc: 'Enter your own consumption figures for Speed 1 and Speed 2.',

    vehiclePresetLabel: 'Vehicle class preset',
    presets: {
      compact: { name: 'Compact Hatchback', detail: 'Petrol · lower frontal area' },
      sedan: { name: 'Midsize Sedan', detail: 'Petrol · standard reference model' },
      diesel_wagon: { name: 'Diesel Touring Wagon', detail: 'Diesel · highway efficiency' },
      suv: { name: 'SUV / Crossover', detail: 'Petrol · higher aerodynamic drag' },
    },

    cons1Label: 'Consumption at Speed 1',
    cons2Label: 'Consumption at Speed 2',
    consHintMetric: 'Average fuel burn in L/100km (e.g., 6.0).',
    consHintImperial: 'Fuel economy in US miles per gallon (MPG, e.g., 39.2).',

    fuelPriceTitle: 'Fuel market price',
    fuelPriceLabelMetric: 'Price per liter',
    fuelPriceLabelImperial: 'Price per US gallon',
    fuelPriceHint: 'Current pump price in your selected currency.',

    errDistance: 'Enter a valid trip distance greater than 0.',
    errSpeedMetric: 'Enter a speed between 5 and 350 km/h.',
    errSpeedImperial: 'Enter a speed between 5 and 220 mph.',
    errConsumptionMetric: 'Enter a fuel consumption between 0.1 and 60 L/100km.',
    errConsumptionImperial: 'Enter a fuel economy between 1 and 200 MPG.',
    errPrice: 'Enter a valid fuel price of 0 or greater.',
    validationBanner: 'Please correct the highlighted input fields to view the analysis.',

    unitDistanceMetric: 'km',
    unitDistanceImperial: 'mi',
    unitSpeedMetric: 'km/h',
    unitSpeedImperial: 'mph',
    unitConsMetric: 'L/100km',
    unitConsImperial: 'MPG',
    unitVolumeMetric: 'L',
    unitVolumeImperial: 'gal',
    unitCo2Metric: 'kg CO₂',
    unitCo2Imperial: 'lb CO₂',
    unitHourShort: 'h',
    unitMinShort: 'm',

    resultsTitle: 'Analysis Summary',
    kpiTimeTitle: 'Time Difference',
    kpiFuelTitle: 'Fuel Difference',
    kpiCostTitle: 'Cost Difference',
    kpiCo2Title: 'CO₂ Difference',
    statusTimeSaved: 'Time saved (Speed 2)',
    statusTimeLost: 'Extra time (Speed 2)',
    statusEqual: 'No difference',
    statusMoreFuel: 'Extra fuel (Speed 2)',
    statusLessFuel: 'Fuel saved (Speed 2)',
    statusMoreCost: 'Extra cost (Speed 2)',
    statusLessCost: 'Money saved (Speed 2)',
    statusMoreCo2: 'Extra CO₂ (Speed 2)',
    statusLessCo2: 'CO₂ avoided (Speed 2)',

    timeBarTitle: 'Relative Travel Time Change',
    timeBarSavedDesc: 'Speed 2 reduces travel time by',
    timeBarLostDesc: 'Speed 2 increases travel time by',
    timeBarEqualDesc: 'Both speeds produce the exact same travel duration.',
    timeAt: 'Time at',

    economicVerdictTitle: 'Economic Trade-Off (Time vs. Cost)',
    costPerSavedHourLabel: 'Cost per hour saved',
    savingsPerExtraHourLabel: 'Savings per extra hour driven',
    equalSpeedsVerdict: 'Enter two different speeds to evaluate the time-vs-cost trade-off.',
    economicHintFaster:
      'Effective hourly fuel cost paid to arrive earlier at Speed 2.',
    economicHintSlower:
      'Effective hourly fuel savings earned by cruising slower at Speed 2.',

    co2ImpactTitle: 'Annual CO₂ Projection (Commuter Scenario)',
    co2AnnualLabel: 'Annual CO₂ difference (200 trips)',
    co2TreesLabel: 'Offset equivalent',
    co2TreesUnit: 'mature trees / year',
    co2AnnualBasis: 'Based on ~22 kg (48.5 lb) of CO₂ absorbed per mature tree annually.',

    chartTitle: 'Speed Performance Curve',
    chartSubtitle:
      'Modeled across highway speeds using the quadratic aerodynamic drag curve for the active preset.',
    chartManualNotice:
      'Note: The curve plots the selected vehicle preset while markers V1 and V2 display your manual entries.',
    chartMetricConsumption: 'Consumption',
    chartMetricCost: 'Trip Cost',
    chartMetricCo2: 'CO₂ Emissions',
    chartAxisSpeed: 'Speed',
    chartHoverHint: 'Hover or focus any data point to inspect exact values.',
    chartMarkerV1: 'Speed 1',
    chartMarkerV2: 'Speed 2',
    chartInspectSpeed: 'Inspected speed',
    chartInspectTime: 'Trip duration',

    tableTitle: 'Side-by-Side Comparison (Speed 1 vs. Speed 2)',
    tableCaption: 'Full quantitative comparison of travel time, fuel rate, volume, cost, and CO₂',
    tableColMetric: 'Metric',
    tableColSpeed1: 'Speed 1',
    tableColSpeed2: 'Speed 2',
    tableColDiff: 'Difference (V2 − V1)',
    rowTravelTime: 'Travel time',
    rowConsumptionRate: 'Fuel economy / rate',
    rowTotalFuel: 'Total fuel (trip)',
    rowTotalCost: 'Total cost (trip)',
    rowCo2Emissions: 'CO₂ emissions (trip)',

    methodologyTitle: 'Methodology, Formulas & Conversion Factors',
    methodologySubtitle: 'Transparent engineering formulas behind every number.',
    methodDragTitle: 'Quadratic Aerodynamic Drag Model',
    methodDragBody:
      'Aerodynamic drag force increases with the square of vehicle velocity. Specific consumption is modeled as C(v) = c₀ + k · v² (L/100km for v in km/h). For the Midsize Sedan preset, this uses the standard formula 3.273 + 0.000273 × v².',
    methodCo2Title: 'CO₂ Emission Factors (Tank-to-Wheel)',
    methodCo2Body:
      'Direct tailpipe emissions are computed using 2.31 kg CO₂ per liter of gasoline/petrol and 2.64 kg CO₂ per liter of diesel (standard EPA/UBA reference factors). The annual commuter projection assumes 200 trips per year and 22 kg CO₂ absorbed per mature tree annually.',
    methodUnitsTitle: 'International Unit Conversions',
    methodUnitsBody:
      'Switching between Metric and Imperial converts all inputs using exact international definitions: 1 mile = 1.609344 km, 1 US gallon = 3.785412 L, 1 kg = 2.204623 lb, and MPG (US) = 235.214583 ÷ (L/100km).',

    footerNote:
      'All calculations run locally in your browser with zero tracking or external data transfer.',
    footerAccessibility: 'Designed for WCAG 2.1 AA accessibility following USWDS standards.',
    footerBackToTop: 'Back to top',
    footerLegalNavLabel: 'Legal information',
    footerImprint: 'Imprint (Impressum)',
    footerPrivacy: 'Privacy Policy (Datenschutz)',
  },

  es: {
    seoTitle: 'Calculadora de Tiempo, Combustible y CO₂ – Velocidad y Costo',
    seoDescription:
      'Compare velocidades, ahorro de tiempo, consumo de combustible, costo del viaje y emisiones de CO₂ en unidades métricas o imperiales con diseño accesible USWDS.',
    skipToMain: 'Saltar al contenido principal',
    brandTitle: 'Calculadora de Viaje y Combustible',
    navCalculator: 'Calculadora',
    navCurves: 'Curvas',
    navComparison: 'Comparación',
    navMethodology: 'Metodología',
    resetDefaults: 'Restablecer',
    resetAnnouncement: 'Los valores se han restablecido a los predeterminados.',

    settingsRegionLabel: 'Configuración de idioma, unidades, moneda y apariencia',
    languageLabel: 'Idioma',
    unitSystemLabel: 'Unidades',
    unitMetric: 'Métrico (km, L)',
    unitImperial: 'Imperial (mi, gal)',
    currencyLabel: 'Moneda',
    themeLabel: 'Tema',
    themeLight: 'Claro',
    themeDark: 'Oscuro',

    pageTitle: 'Calculadora de Tiempo de Viaje, Combustible y CO₂',
    pageSubtitle:
      'Analice cómo dos velocidades de crucero influyen en la duración del trayecto, el consumo, el costo total y las emisiones de CO₂.',

    tripParamsTitle: 'Parámetros del Viaje y Vehículo',
    tripParamsDesc: 'Todos los cálculos se actualizan al instante.',
    distanceLabel: 'Distancia del trayecto',
    distanceHintMetric: 'Distancia de ida en kilómetros (ej. 100 km).',
    distanceHintImperial: 'Distancia de ida en millas (ej. 62 mi).',
    speed1Label: 'Velocidad 1 (base)',
    speed2Label: 'Velocidad 2 (comparación)',
    speedHintMetric: 'Velocidad media entre 5 y 350 km/h.',
    speedHintImperial: 'Velocidad media entre 5 y 220 mph.',
    swapSpeeds: 'Intercambiar',

    fuelTypeTitle: 'Tipo de combustible (para CO₂)',
    fuelTypes: {
      petrol: 'Gasolina (2,31 kg CO₂/L)',
      diesel: 'Diésel (2,64 kg CO₂/L)',
    },
    fuelTypeHint: 'Define el factor de emisión directa de CO₂ por combustión.',

    consumptionModeTitle: 'Modo de consumo',
    consumptionModeHint:
      'Elija el modelo aerodinámico con perfil de vehículo o introduzca sus propios datos.',
    modeAutoLabel: 'Modelo automático (Arrastre aerodinámico)',
    modeAutoDesc: 'Calcula el consumo mediante el modelo cuadrático de resistencia al aire.',
    modeManualLabel: 'Entrada manual',
    modeManualDesc: 'Introduzca consumos propios para Velocidad 1 y Velocidad 2.',

    vehiclePresetLabel: 'Clase de vehículo (Preset)',
    presets: {
      compact: { name: 'Compacto urbano', detail: 'Gasolina · menor resistencia' },
      sedan: { name: 'Berlina mediana', detail: 'Gasolina · modelo estándar' },
      diesel_wagon: { name: 'Familiar Diésel', detail: 'Diésel · optimizado en autopista' },
      suv: { name: 'SUV / Crossover', detail: 'Gasolina · mayor superficie frontal' },
    },

    cons1Label: 'Consumo a Velocidad 1',
    cons2Label: 'Consumo a Velocidad 2',
    consHintMetric: 'Consumo medio en L/100km (ej. 6,0).',
    consHintImperial: 'Eficiencia en millas por galón US (MPG, ej. 39,2).',

    fuelPriceTitle: 'Precio del combustible',
    fuelPriceLabelMetric: 'Precio por litro',
    fuelPriceLabelImperial: 'Precio por galón US',
    fuelPriceHint: 'Precio actual en la moneda seleccionada.',

    errDistance: 'Introduzca una distancia válida mayor que 0.',
    errSpeedMetric: 'Introduzca una velocidad entre 5 y 350 km/h.',
    errSpeedImperial: 'Introduzca una velocidad entre 5 y 220 mph.',
    errConsumptionMetric: 'Introduzca un consumo entre 0,1 y 60 L/100km.',
    errConsumptionImperial: 'Introduzca un valor entre 1 y 200 MPG.',
    errPrice: 'Introduzca un precio válido igual o superior a 0.',
    validationBanner: 'Corrija los campos marcados para ver el análisis.',

    unitDistanceMetric: 'km',
    unitDistanceImperial: 'mi',
    unitSpeedMetric: 'km/h',
    unitSpeedImperial: 'mph',
    unitConsMetric: 'L/100km',
    unitConsImperial: 'MPG',
    unitVolumeMetric: 'L',
    unitVolumeImperial: 'gal',
    unitCo2Metric: 'kg CO₂',
    unitCo2Imperial: 'lb CO₂',
    unitHourShort: 'h',
    unitMinShort: 'min',

    resultsTitle: 'Resumen del Análisis',
    kpiTimeTitle: 'Diferencia de Tiempo',
    kpiFuelTitle: 'Diferencia de Combustible',
    kpiCostTitle: 'Diferencia de Costo',
    kpiCo2Title: 'Diferencia de CO₂',
    statusTimeSaved: 'Ahorro de tiempo (V2)',
    statusTimeLost: 'Tiempo extra (V2)',
    statusEqual: 'Sin diferencia',
    statusMoreFuel: 'Consumo extra (V2)',
    statusLessFuel: 'Ahorro combustible (V2)',
    statusMoreCost: 'Costo extra (V2)',
    statusLessCost: 'Ahorro económico (V2)',
    statusMoreCo2: 'CO₂ adicional (V2)',
    statusLessCo2: 'CO₂ evitado (V2)',

    timeBarTitle: 'Cambio Relativo del Tiempo de Viaje',
    timeBarSavedDesc: 'La Velocidad 2 reduce el tiempo de viaje en',
    timeBarLostDesc: 'La Velocidad 2 aumenta el tiempo de viaje en',
    timeBarEqualDesc: 'Ambas velocidades producen exactamente la misma duración.',
    timeAt: 'Tiempo a',

    economicVerdictTitle: 'Relación Costo-Tiempo',
    costPerSavedHourLabel: 'Costo por hora ahorrada',
    savingsPerExtraHourLabel: 'Ahorro por hora adicional',
    equalSpeedsVerdict: 'Seleccione dos velocidades distintas para comparar costo y tiempo.',
    economicHintFaster: 'Costo efectivo de combustible por cada hora ganada a Velocidad 2.',
    economicHintSlower: 'Ahorro efectivo de combustible por cada hora adicional de viaje.',

    co2ImpactTitle: 'Impacto Anual de CO₂ (Escenario diario)',
    co2AnnualLabel: 'Diferencia anual de CO₂ (200 viajes)',
    co2TreesLabel: 'Equivalente de absorción',
    co2TreesUnit: 'árboles maduros / año',
    co2AnnualBasis: 'Basado en 22 kg de CO₂ absorbidos por árbol maduro al año.',

    chartTitle: 'Curva de Rendimiento por Velocidad',
    chartSubtitle: 'Modelo aerodinámico cuadrático para la clase de vehículo seleccionada.',
    chartManualNotice:
      'Nota: La curva muestra el perfil de vehículo seleccionado; los marcadores V1 y V2 reflejan sus datos manuales.',
    chartMetricConsumption: 'Consumo',
    chartMetricCost: 'Costo del viaje',
    chartMetricCo2: 'Emisiones CO₂',
    chartAxisSpeed: 'Velocidad',
    chartHoverHint: 'Pase el cursor o enfoque un punto para ver valores exactos.',
    chartMarkerV1: 'Velocidad 1',
    chartMarkerV2: 'Velocidad 2',
    chartInspectSpeed: 'Velocidad seleccionada',
    chartInspectTime: 'Duración',

    tableTitle: 'Comparación Detallada (Velocidad 1 vs. Velocidad 2)',
    tableCaption: 'Comparación completa de tiempo, consumo, volumen, costo y CO₂',
    tableColMetric: 'Indicador',
    tableColSpeed1: 'Velocidad 1',
    tableColSpeed2: 'Velocidad 2',
    tableColDiff: 'Diferencia (V2 − V1)',
    rowTravelTime: 'Tiempo de viaje',
    rowConsumptionRate: 'Consumo específico',
    rowTotalFuel: 'Combustible total',
    rowTotalCost: 'Costo total del viaje',
    rowCo2Emissions: 'Emisiones de CO₂',

    methodologyTitle: 'Metodología, Fórmulas y Conversiones',
    methodologySubtitle: 'Bases físicas transparentes detrás de cada cálculo.',
    methodDragTitle: 'Modelo Cuadrático de Arrastre Aerodinámico',
    methodDragBody:
      'La resistencia aerodinámica crece con el cuadrado de la velocidad: C(v) = c₀ + k · v² (L/100km para v en km/h). Para la berlina mediana se aplica 3,273 + 0,000273 × v².',
    methodCo2Title: 'Factores de Emisión de CO₂',
    methodCo2Body:
      'Se aplican 2,31 kg de CO₂ por litro de gasolina y 2,64 kg por litro de diésel. La proyección anual considera 200 trayectos/año y 22 kg de CO₂ absorbidos por árbol maduro al año.',
    methodUnitsTitle: 'Conversión Internacional de Unidades',
    methodUnitsBody:
      '1 milla = 1,609344 km, 1 galón US = 3,785412 L, 1 kg = 2,204623 lb y MPG (US) = 235,214583 ÷ (L/100km).',

    footerNote: 'Todos los cálculos se ejecutan localmente en su navegador sin rastreo.',
    footerAccessibility: 'Diseñado conforme a WCAG 2.1 AA y estándares USWDS.',
    footerBackToTop: 'Volver arriba',
    footerLegalNavLabel: 'Información legal',
    footerImprint: 'Aviso legal (Impressum)',
    footerPrivacy: 'Privacidad (Datenschutz)',
  },

  fr: {
    seoTitle: 'Calculateur de Temps de Trajet, Carburant et CO₂',
    seoDescription:
      'Comparez deux vitesses de conduite : gain de temps, consommation de carburant, coût total et émissions de CO₂ en unités métriques ou impériales (design USWDS accessible).',
    skipToMain: 'Aller au contenu principal',
    brandTitle: 'Calculateur Trajet & Carburant',
    navCalculator: 'Calculateur',
    navCurves: 'Courbes',
    navComparison: 'Comparatif',
    navMethodology: 'Méthodologie',
    resetDefaults: 'Réinitialiser',
    resetAnnouncement: 'Les paramètres ont été réinitialisés aux valeurs par défaut.',

    settingsRegionLabel: 'Paramètres de langue, unités, devise et thème',
    languageLabel: 'Langue',
    unitSystemLabel: 'Unités',
    unitMetric: 'Métrique (km, L)',
    unitImperial: 'Impérial (mi, gal)',
    currencyLabel: 'Devise',
    themeLabel: 'Thème',
    themeLight: 'Clair',
    themeDark: 'Sombre',

    pageTitle: 'Calculateur de Temps de Trajet, Carburant & CO₂',
    pageSubtitle:
      'Comparez objectivement l’impact de deux vitesses sur la durée du trajet, la consommation, le coût et les émissions de CO₂.',

    tripParamsTitle: 'Paramètres du Trajet et du Véhicule',
    tripParamsDesc: 'Les résultats se mettent à jour en temps réel.',
    distanceLabel: 'Distance du trajet',
    distanceHintMetric: 'Distance aller simple en kilomètres (ex. 100 km).',
    distanceHintImperial: 'Distance aller simple en miles (ex. 62 mi).',
    speed1Label: 'Vitesse 1 (référence)',
    speed2Label: 'Vitesse 2 (comparaison)',
    speedHintMetric: 'Vitesse moyenne entre 5 et 350 km/h.',
    speedHintImperial: 'Vitesse moyenne entre 5 et 220 mph.',
    swapSpeeds: 'Inverser',

    fuelTypeTitle: 'Type de carburant (bilan CO₂)',
    fuelTypes: {
      petrol: 'Essence (2,31 kg CO₂/L)',
      diesel: 'Diesel (2,64 kg CO₂/L)',
    },
    fuelTypeHint: 'Définit le facteur d’émission directe utilisé pour le calcul CO₂.',

    consumptionModeTitle: 'Mode de consommation',
    consumptionModeHint:
      'Utilisez le modèle aérodynamique par catégorie de véhicule ou saisissez vos propres consommations.',
    modeAutoLabel: 'Modèle auto (Traînée aérodynamique)',
    modeAutoDesc: 'Estime la consommation selon le modèle quadratique de traînée.',
    modeManualLabel: 'Saisie manuelle',
    modeManualDesc: 'Saisissez vos valeurs mesurées pour Vitesse 1 et Vitesse 2.',

    vehiclePresetLabel: 'Catégorie de véhicule',
    presets: {
      compact: { name: 'Citadine / Compacte', detail: 'Essence · faible traînée' },
      sedan: { name: 'Berline intermédiaire', detail: 'Essence · modèle de référence' },
      diesel_wagon: { name: 'Break Diesel', detail: 'Diesel · optimisé autoroute' },
      suv: { name: 'SUV / Crossover', detail: 'Essence · surface frontale élevée' },
    },

    cons1Label: 'Consommation à Vitesse 1',
    cons2Label: 'Consommation à Vitesse 2',
    consHintMetric: 'Consommation moyenne en L/100km (ex. 6,0).',
    consHintImperial: 'Rendement en miles par gallon US (MPG, ex. 39,2).',

    fuelPriceTitle: 'Prix du carburant',
    fuelPriceLabelMetric: 'Prix par litre',
    fuelPriceLabelImperial: 'Prix par gallon US',
    fuelPriceHint: 'Prix actuel à la pompe dans la devise sélectionnée.',

    errDistance: 'Veuillez saisir une distance valide supérieure à 0.',
    errSpeedMetric: 'Veuillez saisir une vitesse entre 5 et 350 km/h.',
    errSpeedImperial: 'Veuillez saisir une vitesse entre 5 et 220 mph.',
    errConsumptionMetric: 'Veuillez saisir une consommation entre 0,1 et 60 L/100km.',
    errConsumptionImperial: 'Veuillez saisir une valeur entre 1 et 200 MPG.',
    errPrice: 'Veuillez saisir un prix valide supérieur ou égal à 0.',
    validationBanner: 'Veuillez corriger les champs signalés pour afficher l’analyse.',

    unitDistanceMetric: 'km',
    unitDistanceImperial: 'mi',
    unitSpeedMetric: 'km/h',
    unitSpeedImperial: 'mph',
    unitConsMetric: 'L/100km',
    unitConsImperial: 'MPG',
    unitVolumeMetric: 'L',
    unitVolumeImperial: 'gal',
    unitCo2Metric: 'kg CO₂',
    unitCo2Imperial: 'lb CO₂',
    unitHourShort: 'h',
    unitMinShort: 'min',

    resultsTitle: 'Synthèse de l’Analyse',
    kpiTimeTitle: 'Écart de Temps',
    kpiFuelTitle: 'Écart de Carburant',
    kpiCostTitle: 'Écart de Coût',
    kpiCo2Title: 'Écart de CO₂',
    statusTimeSaved: 'Temps gagné (V2)',
    statusTimeLost: 'Temps supplémentaire (V2)',
    statusEqual: 'Aucune différence',
    statusMoreFuel: 'Surconsommation (V2)',
    statusLessFuel: 'Économie carburant (V2)',
    statusMoreCost: 'Surcoût (V2)',
    statusLessCost: 'Économie (V2)',
    statusMoreCo2: 'CO₂ supplémentaire (V2)',
    statusLessCo2: 'CO₂ évité (V2)',

    timeBarTitle: 'Variation Relative du Temps de Trajet',
    timeBarSavedDesc: 'La Vitesse 2 réduit le temps de trajet de',
    timeBarLostDesc: 'La Vitesse 2 allonge le temps de trajet de',
    timeBarEqualDesc: 'Les deux vitesses donnent une durée de trajet identique.',
    timeAt: 'Durée à',

    economicVerdictTitle: 'Arbitrage Temps / Coût',
    costPerSavedHourLabel: 'Coût par heure gagnée',
    savingsPerExtraHourLabel: 'Économie par heure supplémentaire',
    equalSpeedsVerdict: 'Choisissez deux vitesses différentes pour évaluer le rapport temps/coût.',
    economicHintFaster: 'Coût horaire effectif du carburant payé pour arriver plus tôt.',
    economicHintSlower: 'Économie horaire réalisée en roulant plus modérément.',

    co2ImpactTitle: 'Projection CO₂ Annuelle (Trajets réguliers)',
    co2AnnualLabel: 'Écart annuel de CO₂ (200 trajets)',
    co2TreesLabel: 'Équivalent de compensation',
    co2TreesUnit: 'arbres matures / an',
    co2AnnualBasis: 'Basé sur environ 22 kg de CO₂ absorbés par arbre mature et par an.',

    chartTitle: 'Courbe de Performance selon la Vitesse',
    chartSubtitle: 'Modélisation aérodynamique quadratique pour la catégorie choisie.',
    chartManualNotice:
      'Note : La courbe suit le profil sélectionné tandis que V1 et V2 affichent vos saisies manuelles.',
    chartMetricConsumption: 'Consommation',
    chartMetricCost: 'Coût du trajet',
    chartMetricCo2: 'Émissions CO₂',
    chartAxisSpeed: 'Vitesse',
    chartHoverHint: 'Survolez ou sélectionnez un point pour consulter les valeurs exactes.',
    chartMarkerV1: 'Vitesse 1',
    chartMarkerV2: 'Vitesse 2',
    chartInspectSpeed: 'Vitesse inspectée',
    chartInspectTime: 'Durée',

    tableTitle: 'Comparatif Détaillé (Vitesse 1 vs Vitesse 2)',
    tableCaption: 'Tableau comparatif complet : durée, consommation, volume, coût et CO₂',
    tableColMetric: 'Indicateur',
    tableColSpeed1: 'Vitesse 1',
    tableColSpeed2: 'Vitesse 2',
    tableColDiff: 'Différence (V2 − V1)',
    rowTravelTime: 'Temps de trajet',
    rowConsumptionRate: 'Consommation spécifique',
    rowTotalFuel: 'Carburant total',
    rowTotalCost: 'Coût total du trajet',
    rowCo2Emissions: 'Émissions de CO₂',

    methodologyTitle: 'Méthodologie, Formules & Conversions',
    methodologySubtitle: 'Transparence complète sur les formules utilisées.',
    methodDragTitle: 'Modèle Quadratique de Traînée Aérodynamique',
    methodDragBody:
      'La résistance aérodynamique augmente avec le carré de la vitesse : C(v) = c₀ + k · v² (L/100km pour v en km/h). Pour la berline intermédiaire : 3,273 + 0,000273 × v².',
    methodCo2Title: 'Facteurs d’Émission CO₂',
    methodCo2Body:
      'Les émissions directes sont calculées avec 2,31 kg CO₂/L pour l’essence et 2,64 kg CO₂/L pour le diesel. La projection annuelle repose sur 200 trajets et 22 kg CO₂ absorbés par arbre mature/an.',
    methodUnitsTitle: 'Conversions Internationales',
    methodUnitsBody:
      '1 mile = 1,609344 km, 1 gallon US = 3,785412 L, 1 kg = 2,204623 lb et MPG (US) = 235,214583 ÷ (L/100km).',

    footerNote: 'Tous les calculs s’exécutent localement dans votre navigateur sans suivi.',
    footerAccessibility: 'Conçu selon WCAG 2.1 AA et les principes USWDS.',
    footerBackToTop: 'Haut de page',
    footerLegalNavLabel: 'Mentions légales',
    footerImprint: 'Mentions légales (Impressum)',
    footerPrivacy: 'Confidentialité (Datenschutz)',
  },

  tr: {
    seoTitle: 'Seyahat Süresi, Yakıt ve CO₂ Tasarruf Hesaplayıcı',
    seoDescription:
      'İki sürüş hızını karşılaştırın: seyahat süresi, yakıt tüketimi, toplam maliyet ve CO₂ salınımını metrik veya emperyal birimlerde erişilebilir USWDS tasarımıyla analiz edin.',
    skipToMain: 'Ana içeriğe geç',
    brandTitle: 'Seyahat ve Yakıt Hesaplayıcı',
    navCalculator: 'Hesaplayıcı',
    navCurves: 'Eğriler',
    navComparison: 'Karşılaştırma',
    navMethodology: 'Yöntem',
    resetDefaults: 'Sıfırla',
    resetAnnouncement: 'Giriş değerleri varsayılan ayarlara sıfırlandı.',

    settingsRegionLabel: 'Dil, birim sistemi, para birimi ve görünüm ayarları',
    languageLabel: 'Dil',
    unitSystemLabel: 'Birimler',
    unitMetric: 'Metrik (km, L)',
    unitImperial: 'Emperyal (mi, gal)',
    currencyLabel: 'Para Birimi',
    themeLabel: 'Görünüm',
    themeLight: 'Açık',
    themeDark: 'Koyu',

    pageTitle: 'Seyahat Süresi, Yakıt ve CO₂ Hesaplayıcı',
    pageSubtitle:
      'İki farklı seyir hızının yolculuk süresi, yakıt tüketimi, toplam maliyet ve karbon salınımı üzerindeki etkisini net biçimde karşılaştırın.',

    tripParamsTitle: 'Yolculuk ve Araç Parametreleri',
    tripParamsDesc: 'Tüm sonuçlar veri girişiyle anlık olarak güncellenir.',
    distanceLabel: 'Yolculuk mesafesi',
    distanceHintMetric: 'Tek yön mesafe, kilometre cinsinden (örn. 100 km).',
    distanceHintImperial: 'Tek yön mesafe, mil cinsinden (örn. 62 mi).',
    speed1Label: 'Hız 1 (referans)',
    speed2Label: 'Hız 2 (karşılaştırma)',
    speedHintMetric: '5 ile 350 km/s arasında ortalama hız.',
    speedHintImperial: '5 ile 220 mph arasında ortalama hız.',
    swapSpeeds: 'Hızları değiştir',

    fuelTypeTitle: 'Yakıt türü (CO₂ hesabı için)',
    fuelTypes: {
      petrol: 'Benzin (2,31 kg CO₂/L)',
      diesel: 'Dizel (2,64 kg CO₂/L)',
    },
    fuelTypeHint: 'CO₂ salınım toplamı için doğrudan yanma faktörünü belirler.',

    consumptionModeTitle: 'Tüketim modu',
    consumptionModeHint:
      'Araç sınıfına göre aerodinamik modeli kullanın veya kendi ölçümlerinizi girin.',
    modeAutoLabel: 'Otomatik model (Aerodinamik sürükleme)',
    modeAutoDesc: 'Karesel hava direnci modeliyle tüketimi hesaplar.',
    modeManualLabel: 'Manuel giriş',
    modeManualDesc: 'Hız 1 ve Hız 2 için kendi tüketim değerlerinizi girin.',

    vehiclePresetLabel: 'Araç sınıfı (Ön ayar)',
    presets: {
      compact: { name: 'Kompakt / Hatchback', detail: 'Benzin · düşük hava direnci' },
      sedan: { name: 'Orta Sınıf Sedan', detail: 'Benzin · standart referans model' },
      diesel_wagon: { name: 'Dizel Station / Touring', detail: 'Dizel · uzun yol verimliliği' },
      suv: { name: 'SUV / Crossover', detail: 'Benzin · yüksek ön kesit alanı' },
    },

    cons1Label: 'Hız 1 tüketimi',
    cons2Label: 'Hız 2 tüketimi',
    consHintMetric: 'Ortalama tüketim, L/100km cinsinden (örn. 6,0).',
    consHintImperial: 'Yakıt ekonomisi, US MPG cinsinden (örn. 39,2).',

    fuelPriceTitle: 'Yakıt fiyatı',
    fuelPriceLabelMetric: 'Litre fiyatı',
    fuelPriceLabelImperial: 'US galon fiyatı',
    fuelPriceHint: 'Seçilen para biriminde güncel pompa fiyatı.',

    errDistance: 'Lütfen 0’dan büyük geçerli bir mesafe girin.',
    errSpeedMetric: 'Lütfen 5 ile 350 km/s arasında bir hız girin.',
    errSpeedImperial: 'Lütfen 5 ile 220 mph arasında bir hız girin.',
    errConsumptionMetric: 'Lütfen 0,1 ile 60 L/100km arasında bir tüketim girin.',
    errConsumptionImperial: 'Lütfen 1 ile 200 MPG arasında bir değer girin.',
    errPrice: 'Lütfen 0 veya daha büyük geçerli bir fiyat girin.',
    validationBanner: 'Analizi görmek için işaretli alanlardaki hataları düzeltin.',

    unitDistanceMetric: 'km',
    unitDistanceImperial: 'mi',
    unitSpeedMetric: 'km/s',
    unitSpeedImperial: 'mph',
    unitConsMetric: 'L/100km',
    unitConsImperial: 'MPG',
    unitVolumeMetric: 'L',
    unitVolumeImperial: 'gal',
    unitCo2Metric: 'kg CO₂',
    unitCo2Imperial: 'lb CO₂',
    unitHourShort: 'sa',
    unitMinShort: 'dk',

    resultsTitle: 'Analiz Özeti',
    kpiTimeTitle: 'Süre Farkı',
    kpiFuelTitle: 'Yakıt Farkı',
    kpiCostTitle: 'Maliyet Farkı',
    kpiCo2Title: 'CO₂ Farkı',
    statusTimeSaved: 'Süre tasarrufu (Hız 2)',
    statusTimeLost: 'Ek süre (Hız 2)',
    statusEqual: 'Fark yok',
    statusMoreFuel: 'Ek yakıt (Hız 2)',
    statusLessFuel: 'Yakıt tasarrufu (Hız 2)',
    statusMoreCost: 'Ek maliyet (Hız 2)',
    statusLessCost: 'Maliyet tasarrufu (Hız 2)',
    statusMoreCo2: 'Ek CO₂ (Hız 2)',
    statusLessCo2: 'Önlenen CO₂ (Hız 2)',

    timeBarTitle: 'Göreceli Seyahat Süresi Değişimi',
    timeBarSavedDesc: 'Hız 2 yolculuk süresini şu oranda kısaltır:',
    timeBarLostDesc: 'Hız 2 yolculuk süresini şu oranda uzatır:',
    timeBarEqualDesc: 'Her iki hız da aynı yolculuk süresini verir.',
    timeAt: 'Süre',

    economicVerdictTitle: 'Ekonomik Değerlendirme (Süre / Maliyet)',
    costPerSavedHourLabel: 'Kazanılan saat başına maliyet',
    savingsPerExtraHourLabel: 'Ek sürüş saati başına tasarruf',
    equalSpeedsVerdict: 'Maliyet-süre dengesi için iki farklı hız girin.',
    economicHintFaster: 'Hız 2 ile kazanılan her bir saat için ödenen efektif yakıt bedeli.',
    economicHintSlower: 'Daha sakin sürüşle eklenen her saat başına sağlanan yakıt tasarrufu.',

    co2ImpactTitle: 'Yıllık CO₂ Projeksiyonu (Düzenli Kullanım)',
    co2AnnualLabel: 'Yıllık CO₂ farkı (200 yolculuk)',
    co2TreesLabel: 'Dengeleme eşdeğeri',
    co2TreesUnit: 'olgun ağaç / yıl',
    co2AnnualBasis: 'Olgun bir ağacın yılda ortalama 22 kg CO₂ tutması baz alınmıştır.',

    chartTitle: 'Hız Performans Eğrisi',
    chartSubtitle: 'Seçilen araç sınıfı için karesel aerodinamik sürükleme modeli.',
    chartManualNotice:
      'Not: Eğri seçili araç modelini, V1 ve V2 işaretçileri manuel değerlerinizi gösterir.',
    chartMetricConsumption: 'Tüketim',
    chartMetricCost: 'Yolculuk Maliyeti',
    chartMetricCo2: 'CO₂ Salınımı',
    chartAxisSpeed: 'Hız',
    chartHoverHint: 'Kesin değerleri görmek için bir noktanın üzerine gelin veya odaklanın.',
    chartMarkerV1: 'Hız 1',
    chartMarkerV2: 'Hız 2',
    chartInspectSpeed: 'Seçilen hız',
    chartInspectTime: 'Süre',

    tableTitle: 'Ayrıntılı Karşılaştırma (Hız 1 vs. Hız 2)',
    tableCaption: 'Süre, tüketim oranı, toplam yakıt, maliyet ve CO₂ karşılaştırma tablosu',
    tableColMetric: 'Ölçüt',
    tableColSpeed1: 'Hız 1',
    tableColSpeed2: 'Hız 2',
    tableColDiff: 'Fark (V2 − V1)',
    rowTravelTime: 'Seyahat süresi',
    rowConsumptionRate: 'Özgül tüketim',
    rowTotalFuel: 'Toplam yakıt',
    rowTotalCost: 'Toplam maliyet',
    rowCo2Emissions: 'CO₂ salınımı',

    methodologyTitle: 'Yöntem, Formüller ve Dönüşüm Faktörleri',
    methodologySubtitle: 'Her hesaplamanın arkasındaki şeffaf fiziksel denklemler.',
    methodDragTitle: 'Karesel Aerodinamik Sürükleme Modeli',
    methodDragBody:
      'Hava direnci hızın karesiyle artar: C(v) = c₀ + k · v² (v km/s iken L/100km). Orta sınıf sedan için standart formül 3,273 + 0,000273 × v² kullanılır.',
    methodCo2Title: 'CO₂ Emisyon Faktörleri',
    methodCo2Body:
      'Doğrudan yanma emisyonu benzin için 2,31 kg CO₂/L ve dizel için 2,64 kg CO₂/L olarak hesaplanır. Yıllık projeksiyon 200 yolculuk ve ağaç başına yıllık 22 kg CO₂ tutulumu varsayar.',
    methodUnitsTitle: 'Uluslararası Birim Dönüşümleri',
    methodUnitsBody:
      '1 mil = 1,609344 km, 1 US galon = 3,785412 L, 1 kg = 2,204623 lb ve MPG (US) = 235,214583 ÷ (L/100km).',

    footerNote: 'Tüm hesaplamalar tarayıcınızda yerel olarak yapılır; izleme yoktur.',
    footerAccessibility: 'WCAG 2.1 AA erişilebilirlik ve USWDS standartlarına göre tasarlandı.',
    footerBackToTop: 'Yukarı çık',
    footerLegalNavLabel: 'Yasal bilgiler',
    footerImprint: 'Künye (Impressum)',
    footerPrivacy: 'Gizlilik (Datenschutz)',
  },
};

export const LANGUAGE_OPTIONS: Array<{ code: Locale; nativeName: string }> = [
  { code: 'de', nativeName: 'Deutsch (DE)' },
  { code: 'en', nativeName: 'English (EN)' },
  { code: 'es', nativeName: 'Español (ES)' },
  { code: 'fr', nativeName: 'Français (FR)' },
  { code: 'tr', nativeName: 'Türkçe (TR)' },
];
