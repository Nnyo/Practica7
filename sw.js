const STATIC_CACHE_NAME = 'static-cache-v1.1'
const INMUTABLE_CACHE_NAME = 'inmutable-cache-v1.1'
const DYNAMIC_CACHE_NAME = 'dynamic-cache-v1.1'

self.addEventListener('install',(event) =>{
    console.log('SW Instalado');
    const respCache = caches.open(STATIC_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                '/',
                'index.html',
                'js/app.js',
                'manifest.json',
                'css/style.css',
                'images/icons/android-launchericon-48-48.png',
                'images/icons/android-launchericon-72-72.png',
                'images/icons/android-launchericon-96-96.png',
                'images/icons/android-launchericon-144-144.png',
                'images/icons/android-launchericon-192-192.png',
                'images/icons/android-launchericon-512-512.png'
            ]
        );
    });

    const respCacheInmutable = caches.open(INMUTABLE_CACHE_NAME).then((cache) =>{
        return cache.addAll(
            [
                'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css',
                'https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.bundle.min.js'
            ]
        )
    });

    event.waitUntil(Promise.all[respCache, respCacheInmutable]);

});



self.addEventListener('fetch', (event) =>{
    const resp = caches.match(event.request).then((resp) =>{
        if(resp){
            return resp;
        }
        return fetch(event.request).then((respWeb) =>{
            caches.open(DYNAMIC_CACHE_NAME).then((cacheDinamico) => {
                cacheDinamico.put(event.request, respWeb);
            })
            return respWeb.clone();
        });
    });

    event.respondWith(resp);

});
