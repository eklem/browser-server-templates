# browser-server-templates
JavaScript service worker as a server for your webpage/web application, living in your browser. Example library on how it can be done and how to use the different moving parts at hand.

**Advantages:**

1. Easy separation of code
2. Extra thread for heavy lifting
3. Notifications at your hand (when the heavy lifting is done?)
4. Easy to create a server template others can use quickly for their projects
5. Easy to maintain, browser updates take care of most stuff. San
6. Only static files, can be hosted cheap, also GitHub pages


### browser-server examples

1. [Calculator](https://eklem.github.io/browser-server-templates/examples/01-calculator/)
2. [Search engine](https://eklem.github.io/browser-server-templates/examples/02-search-engine/)

## Files and their function

### index.html

THe HTML for your web app. Static file (All files are static).

### app.js

Frontend code and initiator of the browser-server (a service worker). Communicates with the service worker by:

**Request:**

```javascript
fetch(./API?command={someDataObject})
```

**Response:**
```
{<JSON object>}
```

### browser-server.js

A service worker that intercepts requests to an `API`-file. Then extracts the command and JSON from the URL, do stuff with it and return some JSON to the frontend.

A switch statement with a case for each command extracted from the URL.

For tasks taking a long time, the browser-server will use postMessage over a broadcastChannel to message the app.js about progress. 

### API

Actually not needed, not even an empty file. If you request this file with a fetch(), the browser-server.js will intercept the request and return a response as if it comes from the non-existing API-file.

### manifest.json

Manifest file. Main function is to make the web app installable on desktops and smartphones.

### mat-lib.js

Just an example code library. This will be the main library you want do do some heavy lifting with. Import in `browser-server.js` and call the functions you need when you get a command and data from the frontend.


## Development setup

```console
cd browser-server-templates
npm install
npm run build
npx serve
```

## WIP

Will use what I figure out in [Stortinget-repository](https://github.om/eklem/stortinget/), more specifically [fetch(./minimalFile?someApiCall{...}) from app.js](https://github.com/eklem/stortinget/issues/67).
