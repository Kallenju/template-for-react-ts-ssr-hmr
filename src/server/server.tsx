import express, { Request, Response } from 'express';
import compress from 'compression';
import render from './render';

const app = express();

app.use(compress());
app.get('/', (request: Request, response: Response) =>
  render(request.url, response)
);

app.use('/static', express.static('./dist/client'));

app.listen(3000);
