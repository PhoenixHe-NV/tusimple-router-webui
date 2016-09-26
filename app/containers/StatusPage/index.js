/*
 *
 * StatusPage
 *
 */

import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import HelmetIntl from 'components/HelmetIntl';
import FlatButton from 'material-ui/FlatButton';

import selectStatusPage from './selectors';
// import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

import { actions, reducer, sagas } from './actions';

class StatusPage extends React.Component {

  static toInject = {
    reducer,
    sagas,
  };

  static propTypes = {
    counter: PropTypes.number,
    isLoading: PropTypes.bool,
    dispatch: PropTypes.func,
  };

  componentWillMount() {
    this.props.dispatch(actions.getCounter());
  }

  render() {
    const { counter, isLoading, dispatch } = this.props;
    return (
      <div className={styles.statusPage}>
        <HelmetIntl appTitle={messages.title} />
        <div>{isLoading ? 'Loading' : 'Loaded'}</div>
        <div>counter: {counter}</div>
        <FlatButton label="+" onTouchTap={() => dispatch(actions.testAdd(1))} />
        <FlatButton label="-" onTouchTap={() => dispatch(actions.testAdd(-1))} />
      </div>
    );
  }
}


export default connect(
  selectStatusPage(),
  (dispatch) => ({
    dispatch,
  })
)(StatusPage);
