import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { injectIntl, intlShape } from 'react-intl';

class HelmetIntl extends Component {
  static propTypes = {
    intl: intlShape.isRequired,
    //eslint-disable-next-line
    appTitle: PropTypes.object.isRequired,
    children: PropTypes.element,
  };

  render() {
    const { intl, children, appTitle } = this.props;
    return (
      <div>
        <Helmet title={intl.formatMessage(appTitle)} {...this.props} />
        { (children && React.Children.only(children)) || null}
      </div>
    );
  }
}

export default injectIntl(HelmetIntl);
