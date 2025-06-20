'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"flutter_bootstrap.js": "608bfafd6271bc4cf4c6ed7ebf3780e6",
"version.json": "4cf5da09ad09f4a43f833e03ea3fdfd9",
"index.html": "c13d2390ba792d76d33cb89479f5c1ad",
"/": "c13d2390ba792d76d33cb89479f5c1ad",
"main.dart.js": "e94ddc40e87b408b366df2cb011294e6",
"flutter.js": "83d881c1dbb6d6bcd6b42e274605b69c",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"manifest.json": "45b8869763ad705fc2b68f8d206be080",
"assets/AssetManifest.json": "80a86d201727c4cb98f4194ee217c4fb",
"assets/NOTICES": "675b09c6efb497936c02efb80b95c157",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/AssetManifest.bin.json": "7222032d02dbb7d5f43b55616cf831ac",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"assets/lib/assets/products/bread.png": "224aed148abfbd864822b90df8d94462",
"assets/lib/assets/products/avacado.png": "d7ea7a3ad9110b018fbba872da72dbee",
"assets/lib/assets/products/potato.png": "3615ca686ce491befbd4f7a76d117170",
"assets/lib/assets/products/milk.png": "9b6770f5d1db48e4952c6f89f08c9731",
"assets/lib/assets/products/tomato.png": "91bf3d980dc3c46681fe88857f5f0819",
"assets/lib/assets/products/search.png": "22f24bda0999ecfb845cb0f31613915c",
"assets/lib/assets/products/brinjal.png": "58363a40c3bc650804dbc0967b7ca247",
"assets/lib/assets/products/banana.png": "1f64b8a20f802ec4b69f57305b43d61c",
"assets/lib/assets/products/vegetables.png": "37cfd15f9d11faa2e1cd8694ac3fefcc",
"assets/lib/assets/categories/clean-essentials.png": "0b1fa111ca12a1ea1661520c3c91369b",
"assets/lib/assets/categories/tea-coffee.png": "c79d12bad0a7a378760b2ae72cbc1aaf",
"assets/lib/assets/categories/shopping-bag.png": "f7dc7999fff0e951fac3f4b638df5a7e",
"assets/lib/assets/categories/health.png": "6b63aebe57df7e747a9dffad64d02962",
"assets/lib/assets/categories/dairy.png": "1dd323070500aaf58931bf223a96a93e",
"assets/lib/assets/categories/sweets.png": "24866b10175cdf9c18db3f975b8855aa",
"assets/lib/assets/categories/munchies.png": "73b84cc365fbe4c347e33ad34343c70c",
"assets/lib/assets/categories/biscuits.png": "66f2fcea045ecf1f757f05d74ece2642",
"assets/lib/assets/categories/vegetable.png": "68705dc905b05a86ab725f0770933e55",
"assets/lib/assets/categories/packaged-foods.png": "fe98d60b11448742cea422b33ee123c3",
"assets/lib/assets/categories/meat.png": "e941b53c43b90a41070837e8166ffdf5",
"assets/lib/assets/categories/organic-fruit.png": "c9309903181f9f7bf8e80051b1ba95ef",
"assets/lib/assets/categories/masalas.png": "337ccf2570d7f9d07a4e932fb63a691d",
"assets/lib/assets/categories/bevarages.png": "93b8ea8b19c2eeb3fd9341bece81a579",
"assets/lib/assets/categories/fruit.png": "a5a642885f2bea48bb531f6ff65119f1",
"assets/lib/services/data/data.json": "9f714e744b1a5c135381a9917e4137cc",
"assets/AssetManifest.bin": "6514700fc9ef01c5ed57258fc354035b",
"assets/fonts/MaterialIcons-Regular.otf": "1901a34d232ef5ed879acf6e3f2b42b3",
"canvaskit/skwasm.js": "ea559890a088fe28b4ddf70e17e60052",
"canvaskit/skwasm.js.symbols": "e72c79950c8a8483d826a7f0560573a1",
"canvaskit/canvaskit.js.symbols": "bdcd3835edf8586b6d6edfce8749fb77",
"canvaskit/skwasm.wasm": "39dd80367a4e71582d234948adc521c0",
"canvaskit/chromium/canvaskit.js.symbols": "b61b5f4673c9698029fa0a746a9ad581",
"canvaskit/chromium/canvaskit.js": "8191e843020c832c9cf8852a4b909d4c",
"canvaskit/chromium/canvaskit.wasm": "f504de372e31c8031018a9ec0a9ef5f0",
"canvaskit/canvaskit.js": "728b2d477d9b8c14593d4f9b82b484f3",
"canvaskit/canvaskit.wasm": "7a3f4ae7d65fc1de6a6e7ddd3224bc93"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
