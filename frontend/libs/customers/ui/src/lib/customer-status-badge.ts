import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CustomerStatus } from '@ef/customers/util';

@Component({
  selector: 'ef-customer-status-badge',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<span class="badge" [class]="'badge--' + status()">{{
    status()
  }}</span>`,
  styleUrl: './customer-status-badge.scss',
})
export class CustomerStatusBadge {
  readonly status = input.required<CustomerStatus>();
}
