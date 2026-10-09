// Sürüm v1.0. Uygulamayı güncelleyince CACHE adındaki sürümü değiştirin (ör. v1.1); eski önbellek kendiliğinden silinir.
const CACHE = "doz-hesaplayici-v1.0";
const ASSETS = ["./", "./index.html", "./manifest.json", "./favicon.ico", "./favicon-32.png", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return; // KÜB bağlantıları ve yazı tipi doğrudan ağa gider

  // Sayfa: önce ağ (güncel doz verisi), çevrimdışıysa önbellek
  if (req.mode === "navigate") {
    e.respondWith(
      fetch(req, { cache: "no-cache" })
        .then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put("./index.html", copy)); return res; })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }
  // Diğer dosyalar: önce önbellek
  e.respondWith(
    caches.match(req).then(hit => hit || fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; }))
  );
});
