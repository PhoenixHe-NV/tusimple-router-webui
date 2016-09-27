/*
 *
 * ErrorIndicator actions
 *
 */

import define from '../../utils/defineActionReducerSagas';

const { actions, reducer } = define('ErrorIndicator/', {
  open: false,
}, {
  open: (state) => state.set('open', true),
  close: (state) => state.set('open', false),
});

export { actions, reducer };
