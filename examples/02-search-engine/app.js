/* ### ################################################################# ### */
/* ### Service worker registration                                       ### */

// ### Removing index.html if it's present in .pathname
const indexRegex = /index\.html/
let pathname = ''
pathname = window.location.pathname.replace(indexRegex, '')

if ('serviceWorker' in navigator) {
  // ### Register a service worker
  navigator.serviceWorker.register(window.location.origin + pathname + 'browser-server.js', {
    type: 'module',
    scope: window.location.origin + window.location.pathname
  })
    .then(
      (registration) => {
        console.log('Service worker registration succeeded:', registration)
      },
      (error) => {
        console.error(`Service worker registration failed: ${error}`)
      }
    )
} else {
  console.error('Service workers are not supported.')
}

/* ### ################################################################# ### */
/* ### BroadcastChannel init + events                                    ### */

const broadcastChannel = new BroadcastChannel('workerserver_app')

/* ### ################################################################# ### */
/* ### Creating HTML to add to document                                  ### */

const populateResult = function (nodeObject) {
  const result = document.getElementById('result')
  const p = document.createElement('p')
  p.setAttribute('id', 'result')
  const pContent = document.createTextNode(nodeObject.mathProblem + nodeObject.answer)
  p.appendChild(pContent)
  result.replaceWith(p)
}

/* ### ################################################################# ### */
/* ### A: Listen to button clicked                                       ### */
/* ### B: fetch()-request data to worker-api                             ### */
/* ### C: handle response json from fetch()-request                      ### */

// A: Make the object, B: populate it, C: stringify it when fetching

const indexButton = document.getElementById('index')

indexButton.addEventListener('click', (event) => {
  const url = document.getElementById('url').value
  const fetchPromise = fetch(encodeURI(window.location.origin + pathname + 'API?' + 'PUT' + '={"url": "' + url + '"}'))
  fetchPromise
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      populateResult(data)
    })
    .catch((error) => {
      console.error(`onRejected function called: ${error.message}`)
    })
})

const documentButton = document.getElementById('documents')

documentButton.addEventListener('click', (event) => {
  const fetchPromise = fetch(encodeURI(window.location.origin + pathname + 'API?' + 'DOCUMENT_COUNT'))
  fetchPromise
    .then((response) => {
      return response.json()
    })
    .then((data) => {
      populateResult(data)
    })
    .catch((error) => {
      console.error(`onRejected function called: ${error.message}`)
    })
})

/* ### ################################################################# ### */
/* ### Listening to postMessages on the broadcastChannel                 ### */

broadcastChannel.onmessage = (message) => {
  console.log('app.js receiving message:')
  console.log(message.data)
  // do something with message
}
