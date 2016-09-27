import React, { PureComponent } from 'react';
import rawLogo from '-!raw!./tusimple-logo.svg';
import styles from './tusimple-logo.css';

/* eslint-disable react/no-danger */

export default class TuSimpleLogo extends PureComponent {

  render() {
    return (
      <div
        className={styles.logo}
        style={{ width: 48, height: 48, transform: 'scale(.72, .72)' }}
        dangerouslySetInnerHTML={{ __html: rawLogo }}
      />
    );
  }
}
