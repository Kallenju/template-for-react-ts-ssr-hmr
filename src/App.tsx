import React from 'react';
import { Layout } from './shared/Layout';
import { Header } from './shared/Header';
import './assets/styles/main.global.styl';

export default function App(): React.ReactElement {
  return (
    <Layout>
      <Header />
    </Layout>
  );
}
