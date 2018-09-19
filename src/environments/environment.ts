// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apilUrl: 'http://local.dev.co/laravel/api/public',
  graphqlUrl: '/graphql/admin',
  oauthUrl: '/oauth/token',
  oauth: {
    client_id: 1,
    client_secret: 'AgV2nCEgGpwE3HW47MLIPd4QlbdeLaHo6nHPqJCq'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
