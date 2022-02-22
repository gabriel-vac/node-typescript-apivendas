import 'reflect-metadata';
import express, { NextFunction, Request, Response } from 'express';
import 'express-async-errors'; // preciso importar para tratar os erros na classe AppError
import cors from 'cors';
import { errors } from 'celebrate'; // tratar os erros do celebrate (aula 36)
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm';

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

app.use(errors()); //erro do celebrate, se gerar erro o middleware seguinte ira tratar também

//middleware para tratamento de erro recebe um 4o parâmetro, o de erro.
app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
  if (error instanceof AppError) {
    return res
      .status(error.statusCode)
      .json({ status: 'error', message: error.message });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error',
  });
});

app.listen(3333, () => {
  console.log('Server started on port 3333!');
});
