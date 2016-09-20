/*
 *
 * AppMenu
 *
 */

import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Paper } from 'material-ui';
import ActionHome from 'material-ui/svg-icons/action/home';
import ActionSetting from 'material-ui/svg-icons/action/settings';
import ActionSettingEthernet from 'material-ui/svg-icons/action/settings-ethernet';
import { List, ListItem, MakeSelectable } from 'material-ui/List';
import { push } from 'react-router-redux';

import palette from '../../palette';
import selectAppMenu from './selectors';
import reducer from './reducer';
import { FormattedMessage } from 'react-intl';
import styles from './styles.css';


const SelectableList = MakeSelectable(List);

class AppMenu extends Component {

  static toInject = {
    reducer,
  };

  static propTypes = {
    push: PropTypes.func,
  };

  static routes = ['/status', '/settings', '/'];

  static getIndexFromPath(pathname) {
    for (let i = 0; i < AppMenu.routes.length; i += 1) {
      if (pathname.startsWith(this.routes[i])) {
        return this.routes[i];
      }
    }
    return -1;
  }

  componentWillMount() {
    this.setState({
      selectedIndex: AppMenu.getIndexFromPath(window.location.pathname),
    });
  }


  handleRequestChange = (event, index) => {
    this.setState({
      selectedIndex: index,
    });
    this.props.push(index);
  };

  makeSelectableItem(index, titleId, LeftIcon) {
    const color = index === this.state.selectedIndex ?
      palette.alternateTextColor : palette.textColor;
    return (
      <ListItem
        leftIcon={<LeftIcon color={color} />}
        key={index}
        value={index}
        primaryText={<FormattedMessage id={titleId} />}
      />
    );
  }

  render() {
    return (
      <Paper zDepth={1} className={styles.appMenu}>
        <SelectableList
          value={this.state.selectedIndex}
          onChange={this.handleRequestChange}
          selectedItemStyle={{
            color: palette.alternateTextColor,
            backgroundColor: palette.primary2Color,
          }}
        >
          {[
            this.makeSelectableItem('/', 'app.containers.HomePage.title', ActionHome),
            this.makeSelectableItem('/status', 'app.containers.StatusPage.title', ActionSettingEthernet),
            this.makeSelectableItem('/settings', 'app.containers.SettingPage.title', ActionSetting),
          ]}
        </SelectableList>
      </Paper>
    );
  }
}

export default connect(
  selectAppMenu(),
  (dispatch) => bindActionCreators({
    push,
  }, dispatch)
)(AppMenu);
