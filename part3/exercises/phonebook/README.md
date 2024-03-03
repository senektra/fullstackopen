# Frontend Phonebook

Uses Caddy to serve created dist folder from 'npm build'

## How Deployment Works

### Railway and Nixpacks

The app is deployed onto railway.app and thus uses their nixpacks builder to
build the app when deployed via github. To replicate the proxy feature from the 
lesson examples, a simple check is done in vite.config.js to see what enironment
the app is currently in (development or production). The global variable
\_\_API_URL\_\_ is then set with the respective backend url.

### Caddy

Since this frontend is not deployed alongside the backend, it therefore cannot
be served by the express server as done in the lesson examples. Instead, we use
Caddy to serve our dist folder that vite creates. Caddy is downloaded and
configured via the nixpacks.toml file. I prefer this approach as the building of
the frontend is moved over to the deployment 'pipeline' instead.
