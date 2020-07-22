import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
// import { ForbiddenComponent } from './forbidden/forbidden.component';
import { AppComponent } from './app.component';
import { AuthGuard } from '@modules/auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
// import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
// import { AuthorizationGuard } from "./authorization.guard"; // <- here
// import { AuthorizationCanGuard } from './authorization.can.guard';
// import { DashboardComponent } from '@modules/dashboard/containers/dashboard/dashboard.component'

const appRoutes: Routes = [
    // {
    //     path: '',
    //     pathMatch: 'full',
    //     // redirectTo: 'home',
    //     component: AppComponent,
    //     // children:[
    //     //     {
    //     //         path: '',
    //     //         loadChildren: () =>
    //     //             import('modules/dashboard/dashboard-routing.module').then(
    //     //                 m => m.DashboardRoutingModule
    //     //             ),
    //     //         // component: DashboardComponent,
    //     //         canActivateChild: [AuthGuard],
    //     //         // children:[
    //     //         //     {
    //     //         //         path: 'k8s',
    //     //         //         loadChildren: () => import(`@modules/kubernetes/aks.routes`).then(m => m.AKSRoutingModule)
    //     //         //     },
    //     //         // ]
    //     //     },
    //     // ]
    //     // component: HomeComponent,
    // },
    // {
    //     path: 'k8s',
    //     loadChildren : () =>
    //             import('modules/kubernetes/aks.routes').then(m => m.AKSRoutingModule),
    // },
    // {
    //     path: 'index',
    //     pathMatch: 'full',
    //     component: AppComponent
    // },
    {
        path: 'home',
        component: HomeComponent,
    },
    // { path: 'forbidden', component: ForbiddenComponent },
    // { path: 'unauthorized', component: UnauthorizedComponent },

    // {
    //     path: 'charts',
    //     loadChildren: () =>
    //         import('modules/charts/charts-routing.module').then(m => m.ChartsRoutingModule),
    // },
    ///////////////////////////////////////////////////
    // {
    //     path: '',
    //     loadChildren: () =>
    //         import('modules/dashboard/dashboard-routing.module').then(
    //             m => m.DashboardRoutingModule
    //         ),
    //     // canActivateChild: [AuthGuard],
    // },
    {
        path: '',
        loadChildren: () =>
            import('modules/dashboard/dashboard.module').then(
                m => m.DashboardModule
            ),
        canActivateChild: [AuthGuard],
    },
    //////////////////////////////////////////////////////
    // {
    //     path: '',
    //     component: AppComponent,
    //     children: [
    //         {
    //             path: '',
                
    //             // canActivate: [],
    //             component: DashboardComponent,
    //             children:[
    //                 { 
    //                     path: 'k8s', 
    //                     loadChildren: () => import(`@modules/kubernetes/aks.routes`).then(m => m.AKSRoutingModule) 
    //                 },
    //                 { 
    //                     path: 'fabric', 
    //                     loadChildren: () => import(`@modules/servicefabric/servicefabric.routes`).then(m => m.FabricRoutingModule) 
    //                 },
    //             ]
    //         }
    //     ],
        
    //     canActivateChild: [AuthGuard],
    // },
    {
        path: 'auth',
        loadChildren: () =>
            import('modules/auth/auth-routing.module').then(m => m.AuthRoutingModule),
        // outlet: 'entry',
    },
    {
        path: 'error',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    },
    // {
    //     path: 'tables',
    //     loadChildren: () =>
    //         import('modules/tables/tables-routing.module').then(m => m.TablesRoutingModule),
    // },
    {
        path: 'version',
        loadChildren: () =>
            import('modules/utility/utility-routing.module').then(m => m.UtilityRoutingModule),
    },
    {
        path: '**',
        pathMatch: 'full',
        loadChildren: () =>
            import('modules/error/error-routing.module').then(m => m.ErrorRoutingModule),
    }
];

// export const routing = RouterModule.forRoot(appRoutes,{ useHash: true });

@NgModule({
    imports: [RouterModule.forRoot(appRoutes,{ useHash: true })],
    exports: [RouterModule],
})
export class AppRoutingModule {}
