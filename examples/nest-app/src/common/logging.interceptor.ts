import { type CallHandler, type ExecutionContext, Injectable, Logger, type NestInterceptor } from '@nestjs/common';

import type { Observable } from 'rxjs';
import { tap } from 'rxjs';

/** Logs the handler name and elapsed time for every handled request. */
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  /**
   * Wraps a route handler to log its completion latency.
   * @param context - The execution context for the current request.
   * @param next - The next handler in the chain.
   * @returns The handler's observable, instrumented with timing.
   */
  public intercept(context: ExecutionContext, next: CallHandler): Observable<unknown> {
    const startedAt = Date.now();
    const handlerName = context.getHandler().name;

    return next.handle().pipe(
      tap(() => {
        this.logger.log(`${handlerName} took ${String(Date.now() - startedAt)}ms`);
      }),
    );
  }
}
