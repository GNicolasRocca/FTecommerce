import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';

@Injectable()
export class UsersModGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();

    const user_id_token = request.user?.sub;
    const user_id_param = request.params?.id;

    if (!user_id_token) {
      throw new UnauthorizedException('El usuario no esta registrado');
    }

    if (user_id_token !== user_id_param) {
      throw new ForbiddenException(
        'No puede acceder a otro usuario que no sea el suyo',
      );
    }
    // Faltaria validar que tenga el bearer token correcto ¿?
    return true;
  }
}
