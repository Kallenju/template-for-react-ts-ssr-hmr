import express from 'express';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import App from '../App';
import indexTemplate from './indexTemplate';

const app = express();

app.use('/static', express.static('./dist/client'));

app.get('/', (req, res) => {
  res.send(indexTemplate(ReactDOMServer.renderToString(<App />)));
});

app.listen(3000);
