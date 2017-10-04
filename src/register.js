const register = () => {
  const src = document.currentScript.src

  navigator.serviceWorker.register(src, {scope: '.'})
    .then(() => {
      console.log(`⭐️ Registed Service Worker. Visit ${src}.html to view coverage`)
    })
    .catch(e => {
      console.error("Couldn't register Service Worker ", e)
    })

}


export default register
