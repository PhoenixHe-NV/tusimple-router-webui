import { fromJS } from 'immutable';
import { take, call, put, fork } from 'redux-saga/effects';

function camelCaseToUpperCase(name) {
  return name.split('').map(
    (ch) => (ch === ch.toUpperCase() ? '_'.concat(ch) : ch.toUpperCase())
  ).join('');
}

export default function defineActionReducerSagas(prefix, initialState, handlers) {
  const actions = {};
  const actionMap = {};
  const sagas = [];

  Object.keys(handlers).forEach((actionName) => {
    const type = prefix + camelCaseToUpperCase(actionName);
    const handler = handlers[actionName];

    if (typeof handler === 'function') {
      const action = (data) => ({ type, data });
      action.type = type;
      actions[actionName] = action;
      actionMap[type] = handler;
      return;
    }

    const { key, request, success, failed, saga } = handler;
    const REQUEST_TYPE = type.concat('_REQUEST');
    const SUCCESS_TYPE = type.concat('_SUCCESS');
    const FAILED_TYPE = type.concat('_FAILED');

    registerAction(actionName, REQUEST_TYPE, key, true, null);
    registerAction(actionName.concat('Success'), SUCCESS_TYPE, key, false, success);
    registerAction(actionName.concat('Failed'), FAILED_TYPE, key, false, failed);

    if (!saga) {
      return;
    }

    sagas.push(saga === 'parallel' ? asyncSagaParallel : asyncSaga);

    function* asyncSaga() {
      while (1) {
        const action = yield take(REQUEST_TYPE);
        yield* asyncCall(action);
      }
    }

    function* asyncSagaParallel() {
      while (1) {
        const action = yield take(REQUEST_TYPE);
        yield fork(asyncCall, action);
      }
    }

    function* asyncCall(action) {
      try {
        const data = yield call(request, action);
        yield put({ type: SUCCESS_TYPE, data });
      } catch (error) {
        yield put({ type: FAILED_TYPE, error });
      }
    }
  });

  return { actions, reducer, sagas };

  function registerAction(name, type, key, setLoading, handler) {
    const actionFunc = (data) => ({ type, data });
    actionFunc.type = type;
    actions[name] = actionFunc;

    if (typeof key === 'string') {
      actionMap[type] = (typeof handler === 'function')
        ? (state, action) => handler(state.set(key, setLoading), action)
        : (state) => state.set(key, setLoading);
    } else {
      actionMap[type] = (typeof handler === 'function')
        ? handler
        : (state) => state;
    }
  }

  function reducer(state = fromJS(initialState), action) {
    const actionHandler = actionMap[action.type];
    return actionHandler ? actionHandler(state, action) : state;
  }
}
