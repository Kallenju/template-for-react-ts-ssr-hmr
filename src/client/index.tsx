import React, { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import AssetsMap from '../shared/interfaces/AssetsMap';
import App from '../App';

declare global {
  interface Window {
    __ASSETS_MAP: AssetsMap;
  }
}

hydrateRoot(
  document,
  <StrictMode>
    <App assetsMap={window.__ASSETS_MAP} />
  </StrictMode>
);
