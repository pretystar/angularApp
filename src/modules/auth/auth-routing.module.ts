/* tslint:disable: ordered-imports*/
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SBRouteData } from '@modules/navigation/models';

/* Module */
import { OAuthModule } from './auth.module';

/* Containers */
import * as authContainers from './containers';

/* Guards */
import * as authGuards from './guards';

/* Routes */
export const ROUTES: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'login',
    },
    {
        path: 'login',
        canActivate: [],
        component: authContainers.LoginComponent,
        data: {
            title: 'Pages Login - DrillPlan DevOps Portal',
        } as SBRouteData,
    },
    {
        path: 'register',
        canActivate: [],
        component: authContainers.RegisterComponent,
        data: {
            title: 'Pages Register - DrillPlan DevOps Portal',
        } as SBRouteData,
    },
    {
        path: 'forgot-password',
        canActivate: [],
        component: authContainers.ForgotPasswordComponent,
        data: {
            title: 'Pages Forgot Password - DrillPlan DevOps Portal',
        } as SBRouteData,
    },
    {
        path: 'forbidden',
        canActivate: [],
        component: authContainers.ForbiddenComponent,
        data: {
            title: 'Pages Forbidden - DrillPlan DevOps Portal',
        } as SBRouteData,
    },
    {
        path: 'unauthorized',
        canActivate: [],
        component: authContainers.UnauthorizedComponent,
        data: {
            title: 'Pages Unauthorized - DrillPlan DevOps Portal',
        } as SBRouteData,
    },
];

@NgModule({
    imports: [OAuthModule, RouterModule.forChild(ROUTES)],
    exports: [RouterModule],
})
export class AuthRoutingModule {}
