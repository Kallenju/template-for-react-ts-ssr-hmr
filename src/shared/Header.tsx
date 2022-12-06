import React, { useState } from 'react';
import styles from './header.module.styl';

export default function Header(): React.ReactElement {
  const [count, setCount] = useState(0);
  function handleClick() {
    setCount(count + 1);
  }
  return (
    <header>
      <h1 className={styles.example}>Hello React</h1>
      <button className={styles.example} onClick={handleClick}>
        Clicked {count} times
      </button>
    </header>
  );
}
