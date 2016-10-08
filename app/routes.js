// These are the pages you can go to.
// They are all wrapped in the App component, which should contain the navbar etc
// See http://blog.mxstbr.com/2016/01/react-apps-with-pages for more information
// about the code splitting business
import { injectContainers } from 'utils/asyncInjectors';

import HomePage from 'containers/HomePage';
import StatusPage from 'containers/StatusPage';
import SettingPage from 'containers/SettingPage';
import NotFoundPage from 'containers/NotFoundPage';
import ErrorIndicator from 'containers/ErrorIndicator';

export default function createRoutes(store) {
  injectContainers(store, {
    SettingPage,
    StatusPage,
    ErrorIndicator,
  });

  return [
    {
      path: '/',
      component: HomePage,
    }, {
      path: '/status',
      component: StatusPage,
    }, {
      path: '/settings',
      component: SettingPage,
    }, {
      path: '*',
      component: NotFoundPage,
    },
  ];
}
