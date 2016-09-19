import expect from 'expect';
import statusPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('statusPageReducer', () => {
  it('returns the initial state', () => {
    expect(statusPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
