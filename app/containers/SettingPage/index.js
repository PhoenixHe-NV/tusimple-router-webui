/*
 *
 * SettingPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import selectSettingPage from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class SettingPage extends React.Component {

  static toInject = {
    reducer,
  };

  render() {
    return (
      <div className={styles.settingPage}>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
    );
  }
}

const mapStateToProps = selectSettingPage();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingPage);
