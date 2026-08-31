import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  computed,
  contentChildren,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';
import { ColumnDef } from './column-def.directive';

/**
 * Presentational, domain-agnostic list. Columns are supplied as templates, so
 * the grid never learns anything about the row type beyond how to key a row.
 *
 * Paging is cursor-driven: the grid emits `loadMore` when the bottom sentinel
 * approaches the viewport, and the caller appends to `rows`.
 */
@Component({
  selector: 'ef-data-grid',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [NgTemplateOutlet],
  templateUrl: './data-grid.html',
  styleUrl: './data-grid.scss',
  host: { class: 'ef-data-grid' },
})
export class DataGrid<T> {
  readonly rows = input.required<readonly T[]>();
  /** Stable identity per row — drives `@for` tracking, so DOM is reused across pages. */
  readonly rowId = input.required<(row: T) => string | number>();
  readonly loading = input(false);
  readonly hasMore = input(false);
  readonly emptyMessage = input('Nothing to show.');
  readonly errorMessage = input<string | null>(null);

  readonly loadMore = output<void>();
  readonly retry = output<void>();

  protected readonly columns = contentChildren<ColumnDef<T>>(ColumnDef);
  protected readonly templateColumns = computed(() =>
    this.columns()
      .map((column) => column.width())
      .join(' '),
  );
  protected readonly isEmpty = computed(
    () =>
      !this.loading() &&
      this.errorMessage() === null &&
      this.rows().length === 0,
  );

  private readonly sentinel = viewChild<ElementRef<HTMLElement>>('sentinel');

  constructor() {
    effect((onCleanup) => {
      const element = this.sentinel()?.nativeElement;
      if (!element) return;

      const observer = new IntersectionObserver(
        (entries) => {
          if (!entries.some((entry) => entry.isIntersecting)) return;
          if (!this.hasMore() || this.loading()) return;
          this.loadMore.emit();
        },
        { rootMargin: '300px' },
      );
      observer.observe(element);
      onCleanup(() => observer.disconnect());
    });
  }
}
