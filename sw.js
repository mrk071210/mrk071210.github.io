importScripts("https://storage.googleapis.com/workbox-cdn/releases/3.1.0/workbox-sw.js")
var cacheStorageKey = 'minimal-pwa-1'
var cacheList = [
  '/',
  'index.html',
  'main.css',
  'pwa.jpg'
]
self.addEventListener('install',e => {
  e.waitUtil(
    caches.open(cacheStorageKey)
    .then(cache => {
      cache.addAll(cacheList)
    })
    .then(() => {
      self.skipWaiting()
    })
  )
})
self.addEventListener('fetch',e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      if(response != null){
        return response
      }
      return fetch(e.request.url)
    })
  )
})
self.addEventListener('activate',e => {
  e.waitUtil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.filter(cacheNames => {
          return cacheNames !== cacheStorageKey
        }).map(cacheNames => {
          return caches.delete(cacheNames)
        })
      )
    }).then(() => {
      return self.clients.claim()
    })
  )
})