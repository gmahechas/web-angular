import { TokenInterceptor } from './token.interceptor';
import { RefreshTokenInterceptor } from './refresh-token.interceptor';

export const interceptors: any[] = [TokenInterceptor, RefreshTokenInterceptor];

export * from './token.interceptor';
export * from './refresh-token.interceptor';
