import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { tap } from 'rxjs/operators';
  
  @Injectable()
  export class FileExistsInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const file = request.file;
  
      if (!file) {
        throw new BadRequestException('No file provided');
      }
  
      return next.handle().pipe(
        tap(() => {
          // Optionally, you can add some logging or additional processing here
        }),
      );
    }
  }
  