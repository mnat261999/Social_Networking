import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from './role.enum';

@Injectable()
export class RolesGuard implements CanActivate {

  constructor(private reflector:Reflector){}


  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const requireRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass()
    ])

    if(!requireRoles){
      return true;
    }

    const {user}=context.switchToHttp().getRequest()


    return requireRoles.some((role)=> user.role?.includes(role))
  }
}
