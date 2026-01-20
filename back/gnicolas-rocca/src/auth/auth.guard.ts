import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
// import { Observable } from 'rxjs';
import { JwtPayload } from 'src/interfaces/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

function validateRequest(request: Request) {
  const auth_header = request.headers['authorization'];

  // Validaciones
  if (!auth_header) return false;
  if (!auth_header.startsWith('Basic ')) return false;

  const credentials = auth_header.replace('Basic', '').trim();
  console.log(credentials);

  const [email, password] = credentials.split(':');

  // Otra validacion
  if (!email || !password) return false;

  // Por ahora solo chequeamos que envie el email y la password
  return true;
}

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const auth_header = request.headers.authorization;

    if (!auth_header) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    const [type, token] = auth_header.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const secret = process.env.JWT_SECRET;

    if (!secret) {
      throw new UnauthorizedException('JWT secret no configurado');
    }

    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      // El usuario +  la expiración
      console.log(payload);

      request.user = payload;
      return true;
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
