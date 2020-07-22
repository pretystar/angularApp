import { AuthGuard } from './auth.guard';
import { AuthCanGuard } from './auth.can.guard';

export const guards = [AuthGuard];

export * from './auth.guard';
export * from './auth.can.guard';
