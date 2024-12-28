;
//asignar un nombre y version al cache
const CACHE_NAME = 'escuelard_asistencia',
  urlsToCache = []

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache)
          .then(() => self.skipWaiting())
      })
      .catch(err => console.log('Falla en registro de cache', err))
  )
})

self.addEventListener('activate', e => {
  const cacheWhitelist = [CACHE_NAME]
  e.waitUntil(
    caches.keys()
      .then(cacheNames => {
        return Promise.all(
          cacheNames.map(cacheName => {
            if (cacheWhitelist.indexOf(cacheName) === -1) {
              return caches.delete(cacheName)
            }
          })
        )
      })
      .then(() => self.clients.claim())
  )
})

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request)
      .then(res => {
        if (res) {
          return res
        }
        return fetch(e.request)
      })
  )
})

//BORRAR CACHE
//caches.delete(/*escuelard_asistencia*/);

//BORRAR TODAS LAS CACHE
/*caches.keys().then(function(names) {
    for (let name of names)
        caches.delete(name);
});*/