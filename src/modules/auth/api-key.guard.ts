/* eslint-disable prettier/prettier */
import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        const apiKey = request.headers['x-api-key'];
        const validApiKey = process.env.API_KEY;
        console.log(validApiKey);

        if (!apiKey || apiKey !== validApiKey) {
            throw new UnauthorizedException(validApiKey);
        }

        return true;
    }
}
