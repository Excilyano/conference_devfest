importScripts("https://cdn.rawgit.com/mozilla/localForage/master/dist//localforage.js");

const FILES_TO_CACHE = [
    './data.json',
    './global.css',
    './index.html',
    './lists.css',
    './loadsw.js',
    './redirect.js',
    './sw.js',
    './img/logo_imta.jpg',
    './notes/notes.css',
    './notes/notes.html',
    './notes/notes.js',
    './session/sessions.html',
    './session/sessions.js',
    './session_detail/session_detail.css',
    './session_detail/session_detail.html',
    './session_detail/session_detail.js',
    './speaker/speakers.html',
    './speaker/speakers.js',
    './speaker_detail/speaker_detail.css',
    './speaker_detail/speaker_detail.html',
    './speaker_detail/speaker_detail.js'
]

const STATIC_CACHE_NAME = 'cache-conference';

self.addEventListener('install', event => {
    event.waitUntil(
        Promise.all([
            caches.open(STATIC_CACHE_NAME)
            .then(cache => {
                return cache.addAll(FILES_TO_CACHE);
            })
        ])
    );
});

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
        .then(response => {
            if (response) {
                console.log(event.request.url, 'servi depuis le cache');
                return response;
            }
            console.log(event.request.url, 'servi depuis le réseau');
            return fetch(event.request);
        })
        .then(function(response) {
            return caches.open(STATIC_CACHE_NAME).then(cache => {
                if (event.request.url.indexOf('.json') < 0) {
                    cache.put(event.request.url, response.clone());
                }
                return response;
            })
        }).catch(error => {
            console.log("Oops");
        })
    );
});

self.skipWaiting();