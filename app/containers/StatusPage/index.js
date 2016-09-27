/*
 *
 * StatusPage
 *
 */

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
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
    plusOne: PropTypes.func,
    minusOne: PropTypes.func,
    getCounter: PropTypes.func,
  };

  componentWillMount() {
    this.props.getCounter();
  }

  render() {
    const { counter, isLoading, plusOne, minusOne } = this.props;
    return (
      <div className={styles.statusPage}>
        <HelmetIntl appTitle={messages.title} />
        <div>{isLoading ? 'Loading' : 'Loaded'}</div>
        <div>counter: {counter}</div>
        <FlatButton label="+" onTouchTap={plusOne} />
        <FlatButton label="-" onTouchTap={minusOne} />
      </div>
    );
  }
}


export default connect(
  selectStatusPage(),
  (dispatch) => bindActionCreators({
    getCounter: () => actions.getCounter(),
    plusOne: () => actions.testAdd(1),
    minusOne: () => actions.testAdd(-1),
  }, dispatch),
)(StatusPage);
