import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicComponent } from './public.component';

const routes: Routes = [
  {
    path: '',
    component: PublicComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   loadChildren: () => DashboardModule,
      //   resolve: {
      //     dashboardData : DashboardResolver
      //   },
      //   data: {
      //     breadcrumb: {
      //       label: 'Dashboard',
      //       disable: true,
      //     },
      //   },
      // },
      /*{
        path: 'igraci',
        loadChildren: () => IgraciModule,
        data: {
          breadcrumb: {
            label: 'Igrači',
            disable: true,
          },
        },
      },
      {
        path: 'utakmice',
        loadChildren: () => UtakmiceModule,
        data: {
          breadcrumb: {
            label: 'Utakmice',
            disable: true,
          },
        },
      },
      {
        path: 'turnir',
        loadChildren: () => TurnirModule,
        data: {
          breadcrumb: {
            label: 'Turnir',
            disable: true,
          },
        },
      },*/
    ],
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PublicRoutingModule {}
