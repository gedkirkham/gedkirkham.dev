const FILES_TO_CACHE = [
    '/index.html',
    '/blog/post/bash-i18n.html',
    '/blog/post/google-fonts.html',
    '/blog/post/loading-icon-button-tutorial.html'
]

const CACHE_NAME = '50'

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('[ServiceWorker] Pre-caching offline page')
            return cache.addAll(FILES_TO_CACHE)
        })
    )
})

self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) {
                    console.log('[ServiceWorker] Removing old cache', key)
                    return caches.delete(key)
                }
            }))
        })
    )
})

self.addEventListener('fetch', event => {
    if (event.request.mode !== 'navigate') return // Not a page navigation, bail.
    
    let splitUrl
    if (event.request.url.includes(':5500/')) splitUrl = event.request.url.split(':5500')
    else splitUrl = event.request.url.split('.dev')
    
    let fileToCache
    switch(splitUrl[1]) {
        case '/':
        case FILES_TO_CACHE[0]:
            fileToCache = FILES_TO_CACHE[0]
            break
        case FILES_TO_CACHE[1]:
            fileToCache = FILES_TO_CACHE[1]
            break
        case FILES_TO_CACHE[2]:
            fileToCache = FILES_TO_CACHE[2]
            break
        case FILES_TO_CACHE[3]:
            fileToCache = FILES_TO_CACHE[3]
            break
    }

    event.respondWith(
        fetch(event.request)
        .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        console.log('[ServiceWorker] Loading cached file:', fileToCache)
                        return cache.match(fileToCache)
                    })
            })
    )
})