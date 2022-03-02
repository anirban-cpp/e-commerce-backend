import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest();

    if (req.body.name === null) req.body.name = '';

    if (req.body.category === null) req.body.category = '';

    if (req.body.price === null) req.body.price = '';

    if (!isNaN(req.body.name) || !isNaN(req.body.category))
      throw new BadRequestException(`Name or Category cannot be a number`);

    if (Object.keys(req.query).length) {
      if (req.category && req.query.category.length !== 0) {
        if (!isNaN(req.query.category))
          throw new BadRequestException(`Name or Category cannot be a number`);
      }
    }

    return next.handle().pipe(tap(() => Date.now()));
  }
}
