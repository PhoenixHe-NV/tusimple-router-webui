import expect from 'expect';
import appMenuReducer from '../reducer';
import { fromJS } from 'immutable';

describe('appMenuReducer', () => {
  it('returns the initial state', () => {
    expect(appMenuReducer(undefined, {})).toEqual(fromJS({}));
  });
});
