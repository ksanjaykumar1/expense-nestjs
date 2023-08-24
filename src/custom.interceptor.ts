import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { data } from './data';

export class CustomInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    handler: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Intercepting request');

    return handler.handle().pipe(
      map(() => {
        console.log('Intercepting response');
        const response = {
          ...data.report[0],
          createdAt: data.report[0].created_at,
        };
        delete response.updated_at;
        delete response.created_at;
        return response;
      }),
    );
  }
}
