/*
 *
 * StatusPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import HelmetIntl from 'components/HelmetIntl';
import selectStatusPage from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

class StatusPage extends React.Component {

  static toInject = {
    reducer,
    sagas,
  };

  render() {
    return (
      <div className={styles.statusPage}>
        <HelmetIntl appTitle={messages.title} />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
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
