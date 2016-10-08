import { fromJS } from 'immutable';
import { take, call, put, fork } from 'redux-saga/effects';

function camelCaseToUpperCase(name) {
  return name.split('').map(
    (ch) => (ch === ch.toUpperCase() ? '_'.concat(ch) : ch.toUpperCase())
  ).join('');
}

/*
 Examples:
 const { actions, reducer, sagas } = defineActionReducerSagas('StatusPage/', {
   isLoading: false,
   data: 0,
 }, {

 // Reducer for action addCounter. The data field is the parameter of the action call.
 addCounter: (state, action) => state.set('data', state.get('data') + action.data),

 // Use saga for all the async actions.
 getCounter: {
   // Switch this key when start request, go success, or go failed
   key: 'isLoading',

   // Set this for parallel call
   saga: 'parallel'

   // Request function should return a promise. Called from sage take()
   request: (action) => api.get('/counter'),

   // Set the data when success. The data field is what the request promise resolves.
   success: (state, action) => state.set('counter', action.data.counter),

   // Do nothing when fail. This field could be omitted for no action.
   // The error is what throws during the request.
   failed: (state, error) => state,
 },
 });

 dispatch(actions.addCounter(100));
 dispatch(actions.getCounter());
 */
export default function define(prefix, initialState, handlers) {
  const actions = {};
  const actionMap = {};
  const sagas = [];

  Object.keys(handlers).forEach((actionName) => {
    // actionName => prefix/ACTION_NAME
    const type = prefix + camelCaseToUpperCase(actionName);
    const handler = handlers[actionName];

    if (typeof handler === 'function') {
      // Sync action
      const action = (data) => ({ type, data });
      action.type = type;
      actions[actionName] = action;
      actionMap[type] = handler;
      return;
    }

    // Async action
    const { key, request, success, failed, saga } = handler;
    // prefix/ACTION_NAME_REQUEST
    const REQUEST_TYPE = type.concat('_REQUEST');
    // prefix/ACTION_NAME_SUCCESS
    const SUCCESS_TYPE = type.concat('_SUCCESS');
    // prefix/ACTION_NAME_FAILED
    const FAILED_TYPE = type.concat('_FAILED');

    registerAction(actionName, REQUEST_TYPE, key, true, null);
    registerAction(actionName.concat('Success'), SUCCESS_TYPE, key, false, success);
    registerAction(actionName.concat('Failed'), FAILED_TYPE, key, false, failed);

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
        console.log(error);
        yield put({ type: FAILED_TYPE, error });
      }
    }
  });

  return { actions, reducer, sagas };

  function registerAction(name, type, key, setLoading, handler) {
    const actionFunc = (data) => ({ type, data });
    // Use actions.actionName.type to get the type
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
