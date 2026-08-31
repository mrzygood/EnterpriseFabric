import { Directive, TemplateRef, inject, input } from '@angular/core';

export interface DataGridCellContext<T> {
  readonly $implicit: T;
  readonly index: number;
}

/**
 * Declares one column of `<ef-data-grid>`. The template body is the cell
 * renderer and the row is the implicit context value.
 *
 * `typeOf` exists purely for type inference: Angular resolves a directive's
 * generic from its inputs, so binding the row collection is what makes
 * `let-row` strongly typed instead of `unknown`. It is never read at runtime.
 *
 * <ng-template efColumnDef="Name" [typeOf]="rows()" width="2fr" let-row>
 *   {{ row.name }}
 * </ng-template>
 */
@Directive({ selector: 'ng-template[efColumnDef]' })
export class ColumnDef<T = unknown> {
  /** Header label. */
  readonly efColumnDef = input.required<string>();
  /** CSS grid track size for this column. */
  readonly width = input('1fr');
  /** Type carrier — bind the same collection passed to the grid's `rows`. */
  readonly typeOf = input<readonly T[]>();

  readonly template = inject<TemplateRef<DataGridCellContext<T>>>(TemplateRef);

  static ngTemplateContextGuard<T>(
    _dir: ColumnDef<T>,
    _ctx: unknown,
  ): _ctx is DataGridCellContext<T> {
    return true;
  }
}
