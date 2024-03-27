const CACHE_NAME = 'cryptopaths-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/style.css',
  '/script.js',
  '/APP_LOGO/app_mask_192.png',
  '/APP_LOGO/app_mask_180.png',
  '/APP_LOGO/app_mask_512.png',
  '/SKY_TOP.jpg',
  // Add more URLs to cache as needed
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  const { request } = event;

  // Check if the request has a supported scheme
  if (request.url.startsWith('http')) {
    event.respondWith(
      caches.match(request)
        .then(response => {
          if (response) {
            return response; // Cache hit - return response
          }

          // Clone the request to ensure it can be used multiple times
          const fetchRequest = request.clone();

          return fetch(fetchRequest).then(
            response => {
              // Check if we received a valid response
              if (!response || response.status !== 200 || response.type !== 'basic') {
                return response;
              }

              // Clone the response to ensure it can be used multiple times
              const responseToCache = response.clone();

              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(request, responseToCache); // Cache the response
                });

              return response;
            }
          );
        })
    );
  }
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
