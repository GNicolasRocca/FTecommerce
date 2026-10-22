import { JwtPayload } from 'src/interfaces/jwtPayload.interface';

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export {};
