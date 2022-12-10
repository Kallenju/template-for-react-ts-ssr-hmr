import React from 'react';
import ReactDom from 'react-dom/client';
import App from '../App';

window.addEventListener('load', () => {
  const container: Element | null = document.querySelector('#react_root');

  if (container) {
    ReactDom.hydrateRoot(container, <App />);
  }
});
