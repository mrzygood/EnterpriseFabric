import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { ApiError } from '@ef/shared/util-types';

const messageFor = (response: HttpErrorResponse): string => {
  if (response.status === 0) return 'Cannot reach the server.';
  const body: unknown = response.error;
  if (typeof body === 'string' && body.length > 0) return body;
  if (typeof body === 'object' && body !== null && 'title' in body) {
    const title = (body as { title: unknown }).title;
    if (typeof title === 'string') return title;
  }
  return response.statusText || 'Request failed.';
};

/** Turns `HttpErrorResponse` into the transport-agnostic `ApiError`. */
export const errorInterceptor: HttpInterceptorFn = (req, next) =>
  next(req).pipe(
    catchError((response: HttpErrorResponse) => {
      const error: ApiError = {
        status: response.status,
        message: messageFor(response),
        isNetworkError: response.status === 0,
      };
      return throwError(() => error);
    }),
  );
