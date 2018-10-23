import { HTTP_INTERCEPTORS } from '@angular/common/http';

import { DefaultInterceptor } from '@web/app/core/interceptors/default-interceptor';
import { TokenInterceptor } from '@web/app/core/interceptors/token-interceptor';
import { RefreshTokenInterceptor } from '@web/app/core/interceptors/refresh-token-interceptor';

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: RefreshTokenInterceptor, multi: true },
];
