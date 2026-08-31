import {
  CUSTOMER_STATUSES,
  Customer,
  CustomerStatus,
} from '@ef/customers/util';

/**
 * Wire format. Deliberately not exported from the lib barrel — the DTO stops
 * here and only `Customer` crosses into feature code.
 */
export interface CustomerDto {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  city: string;
  country: string;
  phone: string;
  status: string;
  createdAt: string;
}

export interface CustomerListResponseDto {
  items: CustomerDto[];
  nextCursor: string | null;
}

const toStatus = (raw: string): CustomerStatus => {
  const normalized = raw.toLowerCase() as CustomerStatus;
  return CUSTOMER_STATUSES.includes(normalized) ? normalized : 'prospect';
};

export const toCustomer = (dto: CustomerDto): Customer => ({
  id: dto.id,
  firstName: dto.firstName,
  lastName: dto.lastName,
  email: dto.email,
  company: dto.company,
  jobTitle: dto.jobTitle,
  city: dto.city,
  country: dto.country,
  phone: dto.phone,
  status: toStatus(dto.status),
  createdAt: new Date(dto.createdAt),
});
