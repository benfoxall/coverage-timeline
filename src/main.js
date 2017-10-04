import register from './register.js'
import worker from './worker.js'

// this script has been included on the page
if(typeof window != 'undefined')
  register()

// loaded as a service worker
else
  worker()
