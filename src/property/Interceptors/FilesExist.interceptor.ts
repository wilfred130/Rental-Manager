import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
    BadRequestException,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  
  @Injectable()
  export class FilesExistInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
      const request = context.switchToHttp().getRequest();
      const files = request.files;
  
      if (!files || files.length === 0) {
        throw new BadRequestException('No files provided');
      }
  
      return next.handle();
    }
  }
