/**
 * passing everything to PromisesAndroid.js
 *
 * https://facebook.github.io/react-native/docs/permissionsandroid.html
 * https://github.com/facebook/react-native/blob/master/Libraries/PermissionsAndroid/PermissionsAndroid.js
 *
 */
import {NativeModules, PermissionsAndroid, Platform} from 'react-native';

PERMISSIONS = {
  READ_CONTACTS: 'android.permission.READ_CONTACTS',
  SEND_SMS: 'android.permission.SEND_SMS'
};
RESULTS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  NEVER_ASK_AGAIN: 'never_ask_again'
};

async function request(permission: string, rationale?: Rationale): Promise<PermissionStatus> {
  const p = PermissionsAndroid.request(permission, rationale);
  console.log('TTT', 'permissions.android.js:41', 'request', JSON.stringify(p));
  return p
}

function check(permission: string): Promise<boolean> {
  console.log('TTT', 'permissions.android.js:35', 'check', 'Checking ' + permission);
  return (PermissionsAndroid.check(permission));
}


let Permissions = {
  request,
  check,
  PERMISSIONS,
  RESULTS
}

module.exports = Permissions;
