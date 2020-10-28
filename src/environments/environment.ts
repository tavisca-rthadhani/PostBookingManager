// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  apiURL: 'https://booking-manager.free.beeceptor.com/',
  appVersion: require('../../package.json').version + '-dev',
  production: false,
  firebase: {
    apiKey: "AIzaSyAxVEEyxOJEY5CFOi_VD-r9eedIDlOXzQA",
    authDomain: "angular-adminpanel.firebaseapp.com",
    databaseURL: "https://angular-adminpanel.firebaseio.com",
    projectId: "angular-adminpanel",
    storageBucket: "angular-adminpanel.appspot.com",
    messagingSenderId: "168763490690",
    appId: "1:168763490690:web:65d1649ac6f3451a36cf9b",
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
