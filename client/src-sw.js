const { offlineFallback, warmStrategyCache } = require('workbox-recipes');
const { CacheFirst } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');
const { StaleWhileRevalidate } = require('workbox-strategies');

//A precache will be generated. This will only be run once. 
precacheAndRoute(self.__WB_MANIFEST);

//A cache of the page will be created. This is particularly useful after the contents of a URL have been revised.  
//The cache will expire in 30 * 24 * 60 * 60 minutes, which is equal to the number of minutes there are in 30 days. 
const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

//Allows users to load provided urls to cache while service workers are installing. Often times used as an alternative to pre-caching.
warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

//Whenever a request has a destination value of 'style', 'script' or 'worker,
//if a request has a status that fits the criteria of our instance of CacheableResponsePlugin, 
//the contents of the request will be saved to the 'asset-cache'

registerRoute(
  ({ request })=>{ return ['style', 'script', 'worker'].includes(request.destination)},
  new StaleWhileRevalidate({
    cacheName: 'asset-cache',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      })
    ]
  })
);
