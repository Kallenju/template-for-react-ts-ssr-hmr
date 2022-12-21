import React from 'react';
import './assets/styles/main.global.styl';
import AssetsMap from './shared/interfaces/AssetsMap';
import Index from './views/Index';
import Header from './shared/Header';

interface AppProps {
  assetsMap: AssetsMap;
}

export default function App({ assetsMap }: AppProps): React.ReactElement {
  return (
    <Index assetsMap={assetsMap}>
      <Header />
    </Index>
  );
}
