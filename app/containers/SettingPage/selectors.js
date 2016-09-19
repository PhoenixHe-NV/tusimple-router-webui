import { createSelector } from 'reselect';

/**
 * Direct selector to the settingPage state domain
 */
const selectSettingPageDomain = () => state => state.get('settingPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by SettingPage
 */

const selectSettingPage = () => createSelector(
  selectSettingPageDomain(),
  (substate) => substate.toJS()
);

export default selectSettingPage;
export {
  selectSettingPageDomain,
};
