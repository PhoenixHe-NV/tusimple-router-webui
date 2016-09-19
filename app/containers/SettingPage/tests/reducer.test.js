import expect from 'expect';
import settingPageReducer from '../reducer';
import { fromJS } from 'immutable';

describe('settingPageReducer', () => {
  it('returns the initial state', () => {
    expect(settingPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
