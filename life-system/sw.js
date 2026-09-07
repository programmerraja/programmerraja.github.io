const CACHE = "dayforge-v13"
const APP = [
  "./",
  "./index.html",
  "./styles.css",
  "./app.js",
  "./store.js",
  "./icon.svg",
  "./manifest.webmanifest",
]

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE).then((cache) => cache.addAll(APP)))
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(keys.filter((key) => key !== CACHE).map((key) => caches.delete(key))),
      ),
  )
  self.clients.claim()
})

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (response.ok) {
          const copy = response.clone()
          caches.open(CACHE).then((cache) => cache.put(event.request, copy))
        }
        return response
      })
      .catch(() =>
        caches.match(event.request).then((response) => response || caches.match("./index.html")),
      ),
  )
})
