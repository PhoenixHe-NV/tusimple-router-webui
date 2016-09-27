/**
 *
 * App.react.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 * NOTE: while this component should technically be a stateless functional
 * component (SFC), hot reloading does not currently support SFCs. If hot
 * reloading is not a neccessity for you then you can refactor it and remove
 * the linting exception.
 */

import React from 'react';

import Header from 'components/Header';
import AppMenu from 'containers/AppMenu';
import ErrorIndicator from 'containers/ErrorIndicator';

import styles from './styles.css';

export default class App extends React.PureComponent {

  static propTypes = {
    children: React.PropTypes.node,
  };

  render() {
    return (
      <div className={styles.container}>

        <div className={styles.contentContainer}>
          <div className={styles.content}>
            { React.Children.toArray(this.props.children) }
          </div>
        </div>

        <div className={styles.menu}>
          <AppMenu />
        </div>

        <div className={styles.header}>
          <Header />
        </div>

        <ErrorIndicator />
      </div>
    );
  }
}
