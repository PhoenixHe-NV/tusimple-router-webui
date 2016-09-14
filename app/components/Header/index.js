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

import messages from './messages';
import palette from '../../palette';
import TuSimpleLogo from '../TusimpleLogo';

class Header extends React.Component {

  static propTypes = {
    counter: PropTypes.number,
    inc: PropTypes.func,
    dec: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      slideIndex: 0,
    };
  }

  handleChange = (value) => {
    this.setState({
      slideIndex: value,
    });
  };

  render() {
    return (
      <View column width={'100%'}>

        <Paper zDepth={2}>
          <View
            height="48px"
            style={{ backgroundColor: palette.primary1Color, justifyContent: 'center' }}
          >
            <View
              width="960px"
            >

              <View auto width="56px" style={{ justifyContent: 'center' }}>
                <TuSimpleLogo />
              </View>

              <View>
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
              </View>

            </View>

          </View>
        </Paper>

      </View>
    );
  }
}

export default Header;
