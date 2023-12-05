const cacheName: string = "clock";
const contentToCache: string[] = [
  "./",
  "./index.html",
  "./index.css",
  "./index.js",
  "./worker.js",
  "./sw.js",
  "./icons/icon192.png",
  "./icons/icon512.png",
  "./icons/maskable192.png",
  "./icons/maskable512.png",
  "./site.webmanifest",
  "./icons/favicon.png",
  "./icons/appletouch.png",
  "./GitHub-Mark-64px.png"
];

self.addEventListener("install", (e: any) => {
  console.log("Service Worker installed");
  e.waitUntil(
    (async () => {
      const cache: Cache = await caches.open(cacheName);
      await cache.addAll(contentToCache).catch((err) => console.log(err));
    })()
  );
});

self.addEventListener("fetch", function (event: any) {
  event.respondWith(
    fetch(event.request).then((res) => {
      let response: Response = res.clone();
      caches.open(cacheName).then((cache) => {
        cache.put(event.request, response);
      });
      return res;
    }).catch((err) => {
      return caches.match(event.request);
    })
  );
});
