this.addEventListener('install', (event) => {
  console.log('sw install');
  event.waitUntil(
    caches.open('sw-install')
      .then((cache) => {
        return cache.addAll([
          './a.jpg',
        ]);
      }),
  );
});

this.addEventListener('activate', (event) => {
  console.log('sw activate');
});

this.addEventListener('message', (event) => {
  console.log('sw message', event.data);
});

this.addEventListener('fetch', (event) => {
  console.log('sw fetch', event.request.url);
  event.respondWith(
    caches.match(event.request)
      .then((res) => {
        return res || fetch(event.request)
          .then((res) => {
            caches.open('sw-fetch')
              .then((cache) => {
                cache.put(event.request, res.clone());
              });
            return res;
          })
          .catch(err => console.log(err));
      }),
  );
});
