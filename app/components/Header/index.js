/**
 *
 * Header
 *
 */

import React from 'react';

import { Paper } from 'material-ui';
import View from 'react-flexbox';

// import messages from './messages';
import palette from '../../palette';
import TuSimpleLogo from '../TusimpleLogo';
import styles from './styles.css';


class Header extends React.Component {


  render() {
    return (
      <View column width={'100%'}>

        <Paper zDepth={2}>
          <View
            height="48px"
            style={{ backgroundColor: palette.primary1Color, justifyContent: 'flex-start' }}
          >
            <div className={styles.container}>

              <View auto width="56px" style={{ justifyContent: 'center' }}>
                <TuSimpleLogo />
              </View>

            </div>

          </View>
        </Paper>

      </View>
    );
  }
}

export default Header;
