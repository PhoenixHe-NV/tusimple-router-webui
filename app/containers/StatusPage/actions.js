/*
 *
 * StatusPage actions
 *
 */

import defineActionReducerSagas from '../../utils/defineActionReducerSagas';
import api from '../../utils/api';

const { actions, reducer, sagas } = defineActionReducerSagas('StatusPage/', {
  counter: 0,
  isLoading: false,
}, {
  testAdd: {
    key: 'isLoading',
    saga: true,
    request: ({ data: toAdd }) => api.post('/counter/add', { toAdd }),
    success: (state, { data: { counter } }) => state.set('counter', counter),
  },
  getCounter: {
    key: 'isLoading',
    saga: true,
    request: () => api.get('/counter'),
    success: (state, { data: { counter } }) => state.set('counter', counter),
  },
});

export { actions, reducer, sagas };
