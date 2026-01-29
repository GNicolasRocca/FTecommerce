import { SetMetadata } from '@nestjs/common';
import { Role } from './roles.enum';

export const ROLES_KEY = 'roles'; // Lo tenemos asi por si el dia de mañana queremos cambiar a ,por ejemplo, user_roles etc...

export const Roles = (...roles: Role[]) => SetMetadata(ROLES_KEY, roles);
// SetMetadata guarda informacion extra (metadata) asociada a una clase o metodo, esa metadata la leemos en el reflector de roles.guard
