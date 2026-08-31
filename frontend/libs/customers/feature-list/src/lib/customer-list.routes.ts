import { Routes } from '@angular/router';

export const customerListRoutes: Routes = [
  {
    path: '',
    title: 'Customers',
    loadComponent: () =>
      import('./customer-list-page').then((m) => m.CustomerListPage),
  },
];
