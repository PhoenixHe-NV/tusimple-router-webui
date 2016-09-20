import { createSelector } from 'reselect';

/**
 * Direct selector to the appMenu state domain
 */
const selectAppMenuDomain = () => (state) => state.get('appMenu');

/**
 * Other specific selectors
 */


/**
 * Default selector used by AppMenu
 */

const selectAppMenu = () => createSelector(
  selectAppMenuDomain(),
  (substate) => substate.toJS()
);

export default selectAppMenu;
export {
  selectAppMenuDomain,
};
