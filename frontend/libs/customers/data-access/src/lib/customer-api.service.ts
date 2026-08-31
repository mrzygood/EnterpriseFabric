import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Customer } from '@ef/customers/util';
import { API_BASE_URL } from '@ef/shared/data-access';
import { CursorPage, CursorQuery } from '@ef/shared/util-types';
import { CustomerListResponseDto, toCustomer } from './customer.dto';

/**
 * Stateless transport. Root-provided on purpose: it owns nothing that needs
 * tearing down, and cross-domain consumers (pickers, dialogs) sit outside the
 * customers route injector.
 */
@Injectable({ providedIn: 'root' })
export class CustomerApiService {
  readonly #http = inject(HttpClient);
  readonly #baseUrl = inject(API_BASE_URL);

  getPage(query: CursorQuery = {}): Observable<CursorPage<Customer>> {
    let params = new HttpParams();
    if (query.cursor) params = params.set('cursor', query.cursor);
    if (query.pageSize) params = params.set('pageSize', query.pageSize);

    return this.#http
      .get<CustomerListResponseDto>(`${this.#baseUrl}/api/customers`, {
        params,
      })
      .pipe(
        map((response) => ({
          items: response.items.map(toCustomer),
          nextCursor: response.nextCursor,
        })),
      );
  }
}
