import path from 'path';
import url from 'url';
import dotenv from 'dotenv';

const __dirname: string = path.dirname(url.fileURLToPath(import.meta.url));

dotenv.config({
  path: path.resolve(__dirname, `../.env.${process.env.DOTENV}`),
});

const { DEV_SERVER_PORT = 3000 } = process.env;

import express, { Request, Response } from 'express';
import compress from 'compression';
import render from './render';

const app = express();

app.use(compress());
app.get('/', (request: Request, response: Response) =>
  render(request.url, response)
);

app.use('/static', express.static('./dist/client'));

app.listen(Number(DEV_SERVER_PORT));
