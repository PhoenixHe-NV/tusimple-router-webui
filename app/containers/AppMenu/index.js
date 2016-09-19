/*
 *
 * AppMenu
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import MenuItem from 'material-ui/MenuItem';
import { Paper } from 'material-ui';
import selectAppMenu from './selectors';
import reducer from './reducer';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import styles from './styles.css';

export class AppMenu extends React.Component {

  static toInject = {
    reducer,
  };

  render() {
    return (
      <Paper zDepth={2} className={styles.appMenu}>
        <MenuItem>
          <FormattedMessage {...messages.status} />
        </MenuItem>
        <MenuItem>
          <FormattedMessage {...messages.status} />
        </MenuItem>
        <MenuItem>
          <FormattedMessage {...messages.status} />
        </MenuItem>
        <MenuItem>
          <FormattedMessage {...messages.status} />
        </MenuItem>
      </Paper>
    );
  }
}

const mapStateToProps = selectAppMenu();

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppMenu);
