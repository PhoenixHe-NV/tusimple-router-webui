import { createSelector } from 'reselect';

/**
 * Direct selector to the statusPage state domain
 */
const selectStatusPageDomain = () => (state) => state.get('statusPage');

/**
 * Other specific selectors
 */


/**
 * Default selector used by StatusPage
 */

const selectStatusPage = () => createSelector(
  selectStatusPageDomain(),
  (substate) => substate.toJS()
);

export default selectStatusPage;
export {
  selectStatusPageDomain,
};
