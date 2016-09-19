/**
 *
 * Header
 *
 */

import React, { PropTypes } from 'react';

import { FormattedMessage } from 'react-intl';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Paper } from 'material-ui';
import View from 'react-flexbox';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from 'react-router-redux';

import messages from './messages';
import palette from '../../palette';
import TuSimpleLogo from '../TusimpleLogo';
import styles from './styles.css';


@connect(null, (dispatch) => bindActionCreators({
  push,
}, dispatch))
class Header extends React.Component {

  static propTypes = {
    counter: PropTypes.number,
    push: PropTypes.func,
  };

  static routes = ['/status', '/setting'];

  static getIndexFromPath(pathname) {
    for (let i = 0; i < Header.routes.length; ++i) {
      if (pathname.startsWith(this.routes[i])) {
        return i;
      }
    }
    return -1;
  }

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: Header.getIndexFromPath(window.location.pathname),
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
    this.props.push(Header.routes[value]);
  };

  render() {
    return (
      <View column width={'100%'}>

        <Paper zDepth={2}>
          <View
            height="48px"
            style={{ backgroundColor: palette.primary1Color, justifyContent: 'center' }}
          >
            <div className={styles.container}>

              <View auto width="56px" style={{ justifyContent: 'center' }}>
                <TuSimpleLogo />
              </View>

              <Tabs
                onChange={this.handleChange}
                value={this.state.slideIndex}
                tabItemContainerStyle={{ width: 280, height: 48 }}
              >
                <Tab
                  label={<FormattedMessage {...messages.status} />}
                  value={0}
                />
                <Tab
                  label={<FormattedMessage {...messages.setting} />}
                  value={1}
                />
              </Tabs>

            </div>

          </View>
        </Paper>

      </View>
    );
  }
}

export default Header;
