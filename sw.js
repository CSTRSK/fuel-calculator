/* Fuel Calculator – Service Worker
   Strategie: HTML network-first (damit Updates ankommen),
   Assets und Icons cache-first (schneller Start, offline nutzbar).
   Alle Pfade relativ -> funktioniert im Unterordner und auf GitHub Pages. */

const CACHE = 'fuel-calculator-v1';
const KERN = ['./', './index.html', './manifest.webmanifest',
              './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => c.addAll(KERN).catch(() => undefined))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((namen) => Promise.all(namen.filter((n) => n !== CACHE).map((n) => caches.delete(n))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;

  const url = new URL(req.url);
  // Nur eigene Dateien behandeln
  if (url.origin !== self.location.origin) return;

  // HTML: erst Netz, dann Cache
  if (req.mode === 'navigate' || (req.headers.get('accept') || '').includes('text/html')) {
    e.respondWith(
      fetch(req)
        .then((antwort) => {
          const kopie = antwort.clone();
          caches.open(CACHE).then((c) => c.put(req, kopie)).catch(() => undefined);
          return antwort;
        })
        .catch(() => caches.match(req).then((t) => t || caches.match('./index.html')))
    );
    return;
  }

  // Assets: erst Cache, dann Netz
  e.respondWith(
    caches.match(req).then((treffer) => {
      if (treffer) return treffer;
      return fetch(req).then((antwort) => {
        if (antwort.ok) {
          const kopie = antwort.clone();
          caches.open(CACHE).then((c) => c.put(req, kopie)).catch(() => undefined);
        }
        return antwort;
      });
    })
  );
});
