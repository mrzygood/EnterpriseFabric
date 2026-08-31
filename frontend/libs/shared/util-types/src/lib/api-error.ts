/** Transport-agnostic error shape. HTTP details are mapped away at the interceptor. */
export interface ApiError {
  readonly status: number;
  readonly message: string;
  /** True when the request never reached the server (offline, DNS, CORS). */
  readonly isNetworkError: boolean;
}

export const isApiError = (value: unknown): value is ApiError =>
  typeof value === 'object' &&
  value !== null &&
  'status' in value &&
  'message' in value &&
  'isNetworkError' in value;
