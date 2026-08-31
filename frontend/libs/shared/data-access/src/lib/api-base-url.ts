import { InjectionToken } from '@angular/core';

/**
 * Origin the API lives on. Empty string means same-origin: in development the
 * dev-server proxy forwards `/api/**` to the backend, in production a reverse
 * proxy is expected to do the same.
 */
export const API_BASE_URL = new InjectionToken<string>('API_BASE_URL');
