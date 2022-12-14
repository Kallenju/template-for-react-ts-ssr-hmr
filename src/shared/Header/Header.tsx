import React, { useState } from 'react';
import styles from './header.module.styl';

export function Header(): React.ReactElement {
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
      <picture>
        <source
          type="image/webp"
          width="637"
          height="118"
          srcSet="/static/images/raster/test-image/test-image.webp"
        />
        <img
          className={styles['preview__image']}
          src="/static/images/raster/test-image/test-image.jpg"
          alt="Test image"
          width="637"
          height="118"
        />
      </picture>
    </header>
  );
}
