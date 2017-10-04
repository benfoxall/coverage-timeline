import frontend from './frontend.html'

const worker = () => {

  const frontendUrl = location.href + '.html'

  self.addEventListener('fetch', event => {

    if(event.request.url == frontendUrl)
      return event
        .respondWith(new Response(frontend,
          {headers: {'Content-type': 'text/html'}}
        ))


    // if(event.request.url.match(/\.js$/)) {
    //   return event
    //     .respondWith(async () => {
    //
    //
    //
    //
    //     })
    // }

  })


  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
  })

  skipWaiting()

}

export default worker
