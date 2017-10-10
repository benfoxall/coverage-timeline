import {parseScript} from 'esprima'
import frontend from './frontend.html'

const worker = () => {

  const frontendUrl = location.href + '.html'

  self.addEventListener('fetch', event => {

    if(event.request.url == frontendUrl)
      return event
        .respondWith(new Response(frontend,
          {headers: {'Content-type': 'text/html'}}
        ))

    // confusingly, this script itself will be re-requested by the page
    if(event.request.url == location.href)
      return


    if(event.request.url.match(/\.js$/)) {
      return event
        .respondWith(async function() {

          const resp = await fetch(event.request)

          if(resp.type == 'opaque') {
            console.log(`unable to rewrite ${name} (opaque)`)
            return resp
          }

          // const clone = resp.clone()

          const code = await resp.text()

          const points = []

          const ast = parseScript(code, {range: true}, (node, meta) => {

            // x = function(){}
            if(
              node.type == 'FunctionExpression' &&
              node.body.type == 'BlockStatement'
            ) {
              points.push(node.body.range[0] + 1)
            }

            // function foo(){}
            if(
              node.type == 'FunctionDeclaration' &&
              node.body.type == 'BlockStatement'
            ) {
              points.push(node.body.range[0] + 1)
            }

            // () => {}
            if(
              node.type == 'ArrowFunctionExpression' &&
              node.body.type == 'BlockStatement'
            ) {
              points.push(node.body.range[0] + 1)
            }
          })


          points.sort((x,y) => x - y)

          // console.log("points", points)

          // it's probably going to be more efficient to
          // create a blob, but screw it for now
          let out = ''
          const last = points.reduce((start, end, i) => {
            out += code.slice(start, end) + `/* ${i} */`
            return end
          }, 0)

          out+= code.slice(last)

          return new Response(out,
            {headers: {'Content-type': 'application/javascript'}}
          )

        }())
    }

  })


  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim())
  })

  skipWaiting()

}

export default worker
