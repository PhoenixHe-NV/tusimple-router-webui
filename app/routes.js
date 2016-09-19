// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { getAsyncInjectors } from 'utils/asyncInjectors';

import StatusPage from 'containers/StatusPage';
import SettingPage from 'containers/SettingPage';
import NotFoundPage from 'containers/NotFoundPage';
import AppMenu from 'containers/AppMenu';

export default function createRoutes(store) {
  // Create reusable async injectors using getAsyncInjectors factory
  const { injectReducer, injectSagas } = getAsyncInjectors(store); // eslint-disable-line no-unused-vars

  const pages = {
    AppMenu,
    SettingPage,
    StatusPage,
  };

  Object.keys(pages).forEach((pageName) => {
    const { toInject } = pages[pageName];

    if (!toInject) {
      return;
    }

    if (toInject.reducer) {
      const name = pageName[0].toLowerCase() + pageName.slice(1);
      injectReducer(name, toInject.reducer);
    }

    if (toInject.sagas) {
      injectSagas(toInject.sagas);
    }
  });

  return [
    {
      path: '/status',
      component: StatusPage,
    }, {
      path: '/setting',
      component: SettingPage,
    }, {
      path: '*',
      component: NotFoundPage,
    },
  ];
}
