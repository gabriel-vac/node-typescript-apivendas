import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';

interface ITokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function isAuthenticated(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT is missing.', 401);
  }

  const [, token] = authHeader.split(' '); //separando a string a partir do espaço, retorna um array de strings. na posição 0 terá a palavra Bearer e na posição terá o token

  try {
    //é uma verificação que não é feita pela nossa aplicação entao temos que usar o try catch
    const decodedToken = verify(token, authConfig.jwt.secret); //verifica se este token foi gerado por essa secret

    const { sub } = decodedToken as ITokenPayload;

    //user nao existe no objeto Request, então precisamos sobrescrever
    //isso é feito na pasta src/@types
    req.user = {
      id: sub,
    };

    return next();
  } catch (error) {
    throw new AppError('invalid JWT Token', 401);
  }
}
