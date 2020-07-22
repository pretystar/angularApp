import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ForbiddenComponent } from './forbidden/forbidden.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';

export const containers = [LoginComponent, RegisterComponent, ForgotPasswordComponent];

export * from './login/login.component';
export * from './register/register.component';
export * from './forgot-password/forgot-password.component';
export * from './unauthorized/unauthorized.component';
export * from './forbidden/forbidden.component';
