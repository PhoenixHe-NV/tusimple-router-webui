/*
 *
 * HomePage
 *
 */

import React, { Component } from 'react';
import HelmetIntl from 'components/HelmetIntl';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';


export default class HomePage extends Component {

  static toInject = {};

  render() {
    return (
      <div className={styles.homePage}>
        <HelmetIntl appTitle={messages.title} />
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
        <h1>
          <FormattedMessage {...messages.header} />
        </h1>
      </div>
    );
  }
}
