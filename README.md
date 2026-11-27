# Travel Time & Fuel Savings Calculator

Reisezeit, Kraftstoffverbrauch, Fahrtkosten und CO₂-Ausstoß für zwei Geschwindigkeiten
im direkten Vergleich – metrisch und imperial, in fünf Sprachen.

**Live:** https://cstrsk.github.io/fuel-calculator/

## Was der Rechner macht

Zwei Geschwindigkeiten auf derselben Strecke gegenüberstellen und zeigen, was der Unterschied
kostet oder spart:

- **Reisezeit** für beide Tempi, samt Zeitgewinn in Minuten und Stunden
- **Kraftstoffverbrauch** über eine Verbrauchskurve, nicht linear – höhere Geschwindigkeit
  kostet überproportional mehr
- **Fahrtkosten** aus Verbrauch und Spritpreis
- **CO₂-Ausstoß** in Kilogramm für die gesamte Strecke
- **Vergleichstabelle** aller Kennzahlen nebeneinander
- **Tempo-Kurve** als Diagramm über den gesamten Geschwindigkeitsbereich

Einheiten sind umschaltbar (km/L bzw. mi/gal), die Sprache folgt der Browsersprache und lässt
sich über das Menü überschreiben: Deutsch, English, Español, Français, Türkçe.

## Rechenmodell

Der Verbrauch folgt einem physikalisch begründeten Ansatz: Luftwiderstand wächst quadratisch
mit der Geschwindigkeit, der Rollwiderstand bleibt konstant. Daraus ergibt sich eine
Verbrauchskurve mit einem verbrauchsärmsten Punkt meist im Bereich 60–90 km/h. Die
Koeffizienten sind auf der Seite unter „Methodik" offengelegt und nicht kalibrierte
Näherungswerte – sie ersetzen keine Messung am konkreten Fahrzeug.

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # erzeugt dist/
```

Voraussetzungen: Node.js 20 oder neuer.

Der Build läuft mit `base: './'`, alle Pfade sind relativ – die Seite funktioniert damit
gleichermaßen im Wurzelverzeichnis, in einem Unterordner und auf GitHub Pages.

### Struktur

```
index.html              Einstiegspunkt, SEO-Metadaten, Service-Worker-Registrierung
src/App.tsx             Zustand, Sprachwahl, Theme, SEO-Synchronisierung
src/components/         Kopfzeile, Eingabeformular, Ergebnisübersicht, Diagramm,
                        Vergleichstabelle, Methodik
src/data/translations.ts  alle Texte in fünf Sprachen
src/utils/calculations.ts Rechenmodell
public/                 Manifest, Service Worker, Icons
```

## Offline-Nutzung

Die Seite ist als PWA installierbar. Der Service Worker liefert HTML netzwerk-first
(Updates kommen sofort an) und Assets cache-first (schneller Start, offline nutzbar).

## Bekannte Grenzen

- Der Verbrauchskoeffizient ist ein Näherungswert, kein fahrzeugspezifischer Messwert.
- Die Strecke ist eine Konstante im Modell; Steigung, Verkehr und Wetter bleiben außen vor.
- Der Zeitgewinn wird ohne Pausen gerechnet – bei längeren Strecken ist die Ersparnis
  in der Praxis kleiner als angezeigt.

## Lizenz

AGPL-3.0 – siehe [LICENSE](LICENSE).

---

CSTRSK.DE · COPYRIGHT 2008–2026 · [cstrsk.de](https://cstrsk.de/)
