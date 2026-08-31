import { Routes } from '@angular/router';

/**
 * The single entry point the app shell knows about. Feature libs stay private
 * to the domain; adding detail/edit pages later means a line here, not a change
 * in the application.
 */
export const customersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@ef/customers/feature-list').then(
            (m) => m.customerListRoutes,
          ),
      },
    ],
  },
];
