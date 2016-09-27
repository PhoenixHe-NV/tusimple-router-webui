import { take, put } from 'redux-saga/effects';
import { actions } from './actions';

function* catchFailedActions() {
  while (1) {
    const action = yield take();
    if (action.type.endsWith('_FAILED')) {
      yield put(actions.open());
    }
  }
}

export default [
  catchFailedActions,
];
