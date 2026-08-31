import { Injectable, computed, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Customer } from '@ef/customers/util';
import { isApiError } from '@ef/shared/util-types';
import { CustomerApiService } from './customer-api.service';

const DEFAULT_PAGE_SIZE = 50;

/**
 * Page state for the customer list. Not root-provided: it accumulates rows and
 * a cursor, so it is provided by the routed component and dies with it.
 */
@Injectable()
export class CustomerListStore {
  readonly #api = inject(CustomerApiService);

  readonly #items = signal<readonly Customer[]>([]);
  readonly #cursor = signal<string | null>(null);
  readonly #loading = signal(false);
  readonly #error = signal<string | null>(null);
  readonly #loadedOnce = signal(false);

  readonly items = this.#items.asReadonly();
  readonly loading = this.#loading.asReadonly();
  readonly error = this.#error.asReadonly();
  readonly loadedOnce = this.#loadedOnce.asReadonly();
  readonly hasMore = computed(
    () => !this.#loadedOnce() || this.#cursor() !== null,
  );
  readonly count = computed(() => this.#items().length);

  async loadNextPage(pageSize = DEFAULT_PAGE_SIZE): Promise<void> {
    if (this.#loading()) return;
    if (this.#loadedOnce() && this.#cursor() === null) return;

    this.#loading.set(true);
    this.#error.set(null);
    try {
      const page = await firstValueFrom(
        this.#api.getPage({ cursor: this.#cursor(), pageSize }),
      );
      this.#items.update((current) => [...current, ...page.items]);
      this.#cursor.set(page.nextCursor);
      this.#loadedOnce.set(true);
    } catch (cause) {
      this.#error.set(
        isApiError(cause) ? cause.message : 'Failed to load customers.',
      );
    } finally {
      this.#loading.set(false);
    }
  }

  /** Drops the loaded pages so the next `loadNextPage` starts from the first cursor. */
  reset(): void {
    this.#items.set([]);
    this.#cursor.set(null);
    this.#error.set(null);
    this.#loadedOnce.set(false);
  }
}
