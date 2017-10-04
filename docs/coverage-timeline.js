(function () {
'use strict';

var register = function () {
  var src = document.currentScript.src;

  navigator.serviceWorker.register(src, {scope: '.'})
    .then(function () {
      console.log(("⭐️ Registed Service Worker. Visit " + src + ".html to view coverage"));
    })
    .catch(function (e) {
      console.error("Couldn't register Service Worker ", e);
    });

};

var frontend = "<!DOCTYPE html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <title>coverage-timeline</title>\n    <style media=\"screen\">\n      body {font-family: sans-serif;}\n      #remove {float:right}\n    </style>\n  </head>\n  <body>\n    <button id=\"remove\">uninstall</button>\n    <h1>Coverage timeline</h1>\n    <h3>todo: stuff here</h3>\n\n\n    <script>\n\n      remove.addEventListener('click', async () => {\n        (await navigator.serviceWorker.getRegistrations())\n          .forEach(registration =>\n            registration.unregister()\n          )\n\n        remove.remove()\n\n      }, false)\n\n    </script>\n  </body>\n</html>\n";

var worker = function () {

  var frontendUrl = location.href + '.html';

  self.addEventListener('fetch', function (event) {

    if(event.request.url == frontendUrl)
      { return event
        .respondWith(new Response(frontend,
          {headers: {'Content-type': 'text/html'}}
        )) }


    // if(event.request.url.match(/\.js$/)) {
    //   return event
    //     .respondWith(async () => {
    //
    //
    //
    //
    //     })
    // }

  });


  self.addEventListener('activate', function (event) {
    event.waitUntil(clients.claim());
  });

  skipWaiting();

};

if(typeof window != 'undefined')
  { register(); }

// loaded as a service worker
else
  { worker(); }

}());
