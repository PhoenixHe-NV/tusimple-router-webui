/*
 *
 * SettingPage
 *
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import HelmetIntl from 'components/HelmetIntl';
import selectSettingPage from './selectors';
import reducer from './reducer';
import sagas from './sagas';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class SettingPage extends Component {

  static toInject = {
    reducer,
    sagas,
  };

  render() {
    return (
      <div className={styles.settingPage}>
        <HelmetIntl appTitle={messages.title} />
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
