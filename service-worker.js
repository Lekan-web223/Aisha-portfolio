const CACHE_NAME = 'adetayo-stitches-v2';
const APP_SHELL = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/manifest.webmanifest',
  '/assets/app-icon.svg',
  '/assets/designer-profile.jpeg',
  '/assets/purple-tailored-dress.jpg',
  '/assets/navy-evening-dress.jpg',
  '/assets/blue-batik-look.jpeg',
  '/assets/teal-printed-look.jpeg',
  '/assets/multicolor-peplum-dress.jpeg',
  '/assets/black-scarf-look.jpeg',
  '/assets/white-studio-look.jpeg',
  '/assets/teal-printed-jacket.jpeg',
  '/assets/burgundy-dress.jpeg'
];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
        return response;
      }).catch(() => caches.match('/index.html'));
    })
  );
});
