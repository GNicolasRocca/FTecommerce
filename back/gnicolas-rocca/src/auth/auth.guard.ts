import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtPayload } from 'src/interfaces/jwtPayload.interface';
import { JwtService } from '@nestjs/jwt';

/*
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
*/

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Usamos el contexto de ejecucion  para acceder de forma segura a la req http
    const request = context.switchToHttp().getRequest<Request>();

    // Obtenemos el header de autenticacion (en nuestro caso Bearer)
    const auth_header = request.headers.authorization;

    if (!auth_header) {
      throw new UnauthorizedException('Token no proporcionado');
    }

    // Dividimos la palabra Bearer del token
    const [type, token] = auth_header.split(' ');

    if (type !== 'Bearer' || !token) {
      throw new UnauthorizedException('Formato de token inválido');
    }

    const secret = process.env.JWT_SECRET;

    // Nos aseguramos de tener la variable de entorno JWT_SECRET
    if (!secret) {
      throw new UnauthorizedException('JWT secret no configurado');
    }

    // Aca por ultimo verificamos el token (verificamos la firma, integridad y fecha de expiracion) y devolvemos el payload decodificado
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token, {
        secret,
      });
      // El usuario +  la expiración
      console.log(payload);

      // Adjunta el payload a la request para reutilizarlo en controllers
      request.user = payload;
      return true; // Autorizamos la request, posteriormente el controller se ejecuta
    } catch {
      throw new UnauthorizedException('Token inválido o expirado');
    }
  }
}
