import React, { PureComponent } from 'react';
import rawLogo from './tusimple-logo.svg?raw';
import './tusimple-logo.css';

export default class TuSimpleLogo extends PureComponent {

  render() {
    return (
      <div
        className="tusimple-logo"
        style={{ width: 48, height: 48, transform: 'scale(.72, .72)' }}
        dangerouslySetInnerHTML={{ __html: rawLogo }}
      />
    );
  }
}
