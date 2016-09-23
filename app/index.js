/**
 * app.js
 *
 * This is the entry file for the application, only setup and boilerplate
 * code.
 */
import 'babel-polyfill';

/* eslint-disable import/no-unresolved */
// Load the favicon, the manifest.json file and the .htaccess file
import 'file?name=[name].[ext]!./favicon.ico';
import '!file?name=[name].[ext]!./manifest.json';
import 'file?name=[name].[ext]!./.htaccess';
/* eslint-enable import/no-unresolved */

// Import all the third party stuff
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import configureStore from './store';

// Import i18n messages
import { translationMessages } from './i18n';

// Import the CSS reset, which HtmlWebpackPlugin transfers to the build folder
// import 'sanitize.css/sanitize.css';

import 'css/index.css';

// Create redux store with history
// this uses the singleton browserHistory provided by react-router
// Optionally, this could be changed to leverage a created history
// e.g. `const browserHistory = useRouterHistory(createBrowserHistory)();`
const initialState = {};
const store = configureStore(initialState, browserHistory);

// Sync history and store, as the react-router-redux reducer
// is under the non-default key ("routing"), selectLocationState
// must be provided for resolving how to retrieve the "route" in the state
import { selectLocationState } from 'containers/App/selectors';
const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: selectLocationState(),
});

import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

import renderApp from './app';
const render = (msg) => renderApp(store, history, msg);

// Hot reloadable translation json files
if (module.hot) {
  // modules.hot.accept does not accept dynamic dependencies,
  // have to be constants at compile-time
  module.hot.accept('./i18n', () => {
    render(translationMessages);
  });

  module.hot.accept('./app', () => {
    render(translationMessages);
  });
}

// Chunked polyfill for browsers without Intl support
if (!window.Intl) {
  Promise.all([
    System.import('intl'),
    System.import('intl/locale-data/jsonp/en.js'),
    System.import('intl/locale-data/jsonp/zh.js'),
  ]).then(() => render(translationMessages));
} else {
  render(translationMessages);
}

// Install ServiceWorker and AppCache in the end since
// it's not most important operation and if main code fails,
// we do not want it installed
import { install } from 'offline-plugin/runtime';
install();
