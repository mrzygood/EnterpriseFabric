import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { CustomerListStore } from '@ef/customers/data-access';
import { CustomerStatusBadge } from '@ef/customers/ui';
import { Customer, customerDisplayName } from '@ef/customers/util';
import { ColumnDef, DataGrid } from '@ef/shared/ui-data-grid';

@Component({
  selector: 'ef-customer-list-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [DataGrid, ColumnDef, CustomerStatusBadge, DatePipe],
  providers: [CustomerListStore],
  templateUrl: './customer-list-page.html',
  styleUrl: './customer-list-page.scss',
})
export class CustomerListPage implements OnInit {
  protected readonly store = inject(CustomerListStore);
  protected readonly displayName = customerDisplayName;
  protected readonly trackById = (customer: Customer): number => customer.id;

  ngOnInit(): void {
    void this.store.loadNextPage();
  }

  protected onLoadMore(): void {
    void this.store.loadNextPage();
  }
}
