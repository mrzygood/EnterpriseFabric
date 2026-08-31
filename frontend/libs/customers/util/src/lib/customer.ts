export type CustomerStatus = 'active' | 'inactive' | 'prospect';

export const CUSTOMER_STATUSES: readonly CustomerStatus[] = [
  'active',
  'inactive',
  'prospect',
];

export interface Customer {
  readonly id: number;
  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly company: string;
  readonly jobTitle: string;
  readonly city: string;
  readonly country: string;
  readonly phone: string;
  readonly status: CustomerStatus;
  readonly createdAt: Date;
}

/** Minimal projection other domains are allowed to depend on. */
export interface CustomerRef {
  readonly id: number;
  readonly displayName: string;
}

export const customerDisplayName = (customer: Customer): string =>
  `${customer.firstName} ${customer.lastName}`.trim();

export const toCustomerRef = (customer: Customer): CustomerRef => ({
  id: customer.id,
  displayName: customerDisplayName(customer),
});
