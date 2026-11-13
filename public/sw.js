const CACHE_NAME = "lale-app-v1";
const APP_ROOT = self.registration.scope;
const STATIC_DESTINATIONS = new Set([
  "script",
  "style",
  "image",
  "font",
  "manifest",
]);

self.addEventListener("install", (event) => {
  event.waitUntil(
    (async () => {
      const filesResponse = await fetch(`${APP_ROOT}precache-manifest.json`);
      if (!filesResponse.ok) {
        throw new Error("Unable to load the app precache manifest");
      }

      const files = await filesResponse.json();
      if (
        !Array.isArray(files) ||
        files.some((file) => typeof file !== "string")
      ) {
        throw new Error("Invalid app precache manifest");
      }

      const assets = files.map((file) => new URL(file, APP_ROOT).href);
      const cache = await caches.open(CACHE_NAME);
      await cache.addAll([
        APP_ROOT,
        `${APP_ROOT}manifest.webmanifest`,
        `${APP_ROOT}icons/tulip.svg`,
        `${APP_ROOT}icons/icon-192.png`,
        `${APP_ROOT}icons/icon-512.png`,
        ...assets,
      ]);
      await self.skipWaiting();
    })(),
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys
            .filter((key) => key.startsWith("lale-app-") && key !== CACHE_NAME)
            .map((key) => caches.delete(key)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  const request = event.request;
  const url = new URL(request.url);

  if (
    request.method !== "GET" ||
    url.origin !== self.location.origin ||
    !url.href.startsWith(APP_ROOT)
  ) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then(async (response) => {
          if (response.ok) {
            await (await caches.open(CACHE_NAME)).put(request, response.clone());
          }
          return response;
        })
        .catch(async () => {
          const cachedPage = await caches.match(request);
          return cachedPage || caches.match(APP_ROOT);
        }),
    );
    return;
  }

  if (STATIC_DESTINATIONS.has(request.destination)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then(async (response) => {
            if (response.ok) {
              await (await caches.open(CACHE_NAME)).put(
                request,
                response.clone(),
              );
            }
            return response;
          }),
      ),
    );
  }
});
