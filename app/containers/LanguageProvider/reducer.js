/*
 *
 * LanguageProvider reducer
 *
 */

import { fromJS } from 'immutable';
import {
  CHANGE_LOCALE,
} from './constants';
import { appLocales } from '../../i18n';

function getDefaultLocale() {
  const defaultLang = navigator.language;
  for (const lang of appLocales) {
    if (defaultLang.startsWith(lang)) {
      return lang;
    }
  }
  return appLocales[0];
}

const initialState = fromJS({
  locale: getDefaultLocale(),
});

function languageProviderReducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_LOCALE:
      return state
        .set('locale', action.locale);
    default:
      return state;
  }
}

export default languageProviderReducer;
