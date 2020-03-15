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
    '/blog/post/loading-icon-button-tutorial.html'
]

const CACHE_NAME = '2'

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
    let splitUrl
    if (event.request.url.includes(':5500/')) splitUrl = event.request.url.split(':5500')
    else splitUrl = event.request.url.split('.dev')

    const FILE_TO_CACHE = splitUrl[1] === '/' ? FILES_TO_CACHE[0] : splitUrl[1]

    event.respondWith(
        fetch(event.request)
        .catch(() => {
                return caches.open(CACHE_NAME)
                    .then((cache) => {
                        console.log('[ServiceWorker] Loading cached file:', FILE_TO_CACHE)
                        return cache.match(FILE_TO_CACHE)
                    })
            })
    )
})