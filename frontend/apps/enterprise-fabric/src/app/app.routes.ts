import { Routes } from '@angular/router';

export const appRoutes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'customers' },
  {
    path: 'customers',
    loadChildren: () =>
      import('@ef/customers/shell').then((m) => m.customersRoutes),
  },
];
