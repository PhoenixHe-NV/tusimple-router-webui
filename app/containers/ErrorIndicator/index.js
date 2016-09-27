/*
 *
 * ErrorIndicator
 *
 */

import React, { Component, PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Snackbar from 'material-ui/Snackbar';

import selectErrorIndicator from './selectors';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { actions, reducer } from './actions';
import sagas from './sagas';


class ErrorIndicator extends Component {

  static toInject = { reducer, sagas };

  static propTypes = {
    handleClose: PropTypes.func,
    open: PropTypes.bool,
  };

  render() {
    const { handleClose, open } = this.props;
    return (
      <Snackbar
        open={open}
        message={<FormattedMessage {...messages.serverError} />}
        autoHideDuration={2000}
        onRequestClose={handleClose}
      />
    );
  }
}


export default connect(
  selectErrorIndicator(),
  (dispatch) => bindActionCreators({
    handleClose: () => actions.close(),
  }, dispatch)
)(ErrorIndicator);
