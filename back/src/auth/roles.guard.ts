import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
// import { Observable } from 'rxjs';
import { Role } from './roles.enum';
import { Request } from 'express';
import { ROLES_KEY } from './roles.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Busca metadata roles, primero en handler (metodo) y luego en class (controller)
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    // Si la ruta no tiene roles pasa (mi caso ahora mismo)
    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    // Lo mismo que antes. usamos el contexto de ejeucion para acceder de forma segura a la req en formato http
    const request = context.switchToHttp().getRequest<Request>();
    const user = request.user; // viene del jwt

    if (!user) {
      throw new ForbiddenException('Usuario no autenticado');
    }

    // Verificamos el role
    const hasRole = requiredRoles.includes(user.role);

    if (!hasRole) {
      throw new ForbiddenException(
        'No tienes permiso para acceder a esta ruta',
      );
    }

    // Acceso concedido
    return true;
  }
}
