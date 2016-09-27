import { createSelector } from 'reselect';

/**
 * Direct selector to the errorIndicator state domain
 */
const selectErrorIndicatorDomain = () => (state) => state.get('errorIndicator');

/**
 * Other specific selectors
 */


/**
 * Default selector used by ErrorIndicator
 */

const selectErrorIndicator = () => createSelector(
  selectErrorIndicatorDomain(),
  (substate) => substate.toJS()
);

export default selectErrorIndicator;
export {
  selectErrorIndicatorDomain,
};
