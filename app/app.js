import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import useScroll from 'react-router-scroll';
import LanguageProvider from 'containers/LanguageProvider';
import { Provider } from 'react-redux';
import { applyRouterMiddleware, Router } from 'react-router';

import palette from './palette';
import App from 'containers/App';
import createRoutes from './routes';


const muiTheme = getMuiTheme({
  palette,
  // fontFamily: 'Roboto, sans-serif',
});

export default function renderApp(store, history, translatedMessages) {
  const rootRoute = {
    component: App,
    childRoutes: createRoutes(store),
  };

  ReactDOM.render(
    <MuiThemeProvider muiTheme={muiTheme}>
      <Provider store={store}>
        <LanguageProvider messages={translatedMessages}>
          <Router
            history={history}
            routes={rootRoute}
            render={
              // Scroll to top when going to a new page, imitating default browser
              // behaviour
              applyRouterMiddleware(useScroll())
            }
          />
        </LanguageProvider>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById('app')
  );
}
