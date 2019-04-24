/**
 * always return resolved promise
 *
 */

PERMISSIONS = {
  READ_CONTACTS: 'N/A',
  SEND_SMS: 'N/A'
};
RESULTS = {
  GRANTED: 'granted',
  DENIED: 'denied',
  NEVER_ASK_AGAIN: 'never_ask_again'
};

async function request(permission: string, rationale?: Rationale): Promise<PermissionStatus> {
  return Promise.resolve(RESULTS.GRANTED);
}

function check(permission: string): Promise<boolean> {
  return Promise.resolve(true);
}

let Permissions = {
  request,
  check,
  PERMISSIONS,
  RESULTS
}

module.exports = Permissions;

