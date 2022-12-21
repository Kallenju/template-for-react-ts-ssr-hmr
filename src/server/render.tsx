import path from 'path';
import url from 'url';
import dotenv from 'dotenv';

const __dirname: string = path.dirname(url.fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.DOTENV}`),
});

const { SSR_ABORT_DELAY = 10000, ASSETS_MAP_GENERAL } = process.env;

import { Response } from 'express';
import React, { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import AssetsMap from '../shared/interfaces/AssetsMap';
import App from '../App';

const isCrawler = false;

export default function render(url: string, response: Response): void {
  const __ASSETS_MAP: AssetsMap = JSON.parse(ASSETS_MAP_GENERAL).main;

  let didError = false;
  const stream: ReturnType<typeof renderToPipeableStream> =
    renderToPipeableStream(
      <StrictMode>
        <App assetsMap={__ASSETS_MAP} />
      </StrictMode>,
      {
        bootstrapScriptContent: `window.__ASSETS_MAP = ${JSON.stringify(
          __ASSETS_MAP
        )};`,
        bootstrapScripts: [`/static/${__ASSETS_MAP.js}`],
        onShellReady() {
          if (!isCrawler) {
            response.statusCode = didError ? 500 : 200;
            response.setHeader('content-type', 'text/html');
            stream.pipe(response);
          }
        },
        onShellError() {
          response.statusCode = 500;
          response.setHeader('content-type', 'text/html');
          response.send('<h1>Something went wrong</h1>');
        },
        onAllReady() {
          if (isCrawler) {
            response.statusCode = didError ? 500 : 200;
            response.setHeader('content-type', 'text/html');
            stream.pipe(response);
          }
        },
        onError(error) {
          didError = true;
          console.error(error);
        },
      }
    );
  setTimeout(() => stream.abort(), Number(SSR_ABORT_DELAY));
}
