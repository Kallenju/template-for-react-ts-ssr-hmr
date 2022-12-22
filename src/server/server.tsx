import path from 'path';
import url from 'url';
import dotenv from 'dotenv';

const __dirname: string = path.dirname(url.fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, `../.${process.env.DOTENV}.env`),
});

const {
  NODE_ENV = 'production',
  DEV_SERVER_PORT = 3000,
  PROD_SERVER_PORT = 3000,
} = process.env;

import express, { Request, Response } from 'express';
import compress from 'compression';
import render from './render';

const app = express();

app.use(compress());
app.get('/', (request: Request, response: Response) =>
  render(request.url, response)
);

app.use('/static', express.static('./dist/client'));

app.listen(
  Number(NODE_ENV === 'development' ? DEV_SERVER_PORT : PROD_SERVER_PORT)
);
