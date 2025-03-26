import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';


declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

interface JwtPayload {
  username: string;
}

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  // TODO: verify the token exists and add the user data to the request object
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token) {

    const secretKey = process.env.JWT_SECRET_Key || '';

    jwt.verify(token, secretKey, (err, user) => {
      if (err) {
        return res.sendStatus(403);
      }
      req.user = user as JwtPayload;
      return next();
    });
  } else {
    res.status(401);
  }
};