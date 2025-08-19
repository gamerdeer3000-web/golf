// Define a name for the cache
const CACHE_NAME = 'golf-score-tracker-v1';
// List the files to cache. The "./" is crucial for GitHub Pages.
const urlsToCache = [
  './',
  './index.html'
  // If you had separate CSS or JS files, you would add them here too.
  // e.g., './styles.css', './app.js'
];

// Install the service worker and cache the app shell
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Opened cache and caching files');
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // If the file is in the cache, return it.
        if (response) {
          return response;
        }
        // Otherwise, try to fetch it from the network.
        return fetch(event.request);
      })
  );
});
