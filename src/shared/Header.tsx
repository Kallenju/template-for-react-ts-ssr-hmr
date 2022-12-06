import React from 'react';
import styles from './header.module.styl';

export default function Header(): React.ReactElement {
  return (
    <header>
      <h1 className={styles.example}>Hello React</h1>
    </header>
  );
}
