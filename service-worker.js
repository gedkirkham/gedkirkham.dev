const FILES_TO_CACHE = [
    '/index.html',
    '/style.css',
    '/files/Ged-Kirkhams-cv-full-stack-web-dev-v3.pdf',
    '/blog/img/google-font-relStylesheet.jpg',
    '/blog/img/google-fonts-stylesheet.jpg',
    '/blog/img/hosted-fonts.jpg',
    '/blog/img/refresh-icon.svg',
    '/blog/post/bash-i18n.html',
    '/blog/post/google-fonts.html',
    '/blog/post/loading-icon-button-tutorial.html',
    '/components/header.wc',
    '/scripts/loader.js'
]

const CACHE_NAME = 'static-cache-v12'

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
    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request)
                .then(response => {
                    return response || fetch(event.request)
                        .then(response => {
                        // If the response was good, clone it and store it in the cache.
                        if (response.status === 200) cache.put(event.request.url, response.clone())
                        return response
                })
            })
        })
    )
})