import { ROLE_PERMISSIONS } from './permissions.js';

export function can(user, permission) {
  if (!user || !user.role) {
    return false;
  }

  const rolePermissions = ROLE_PERMISSIONS[user.role];

  // If role doesn't exist
  if (!rolePermissions) {
    return false;
  }

  // Admin wildcard access
  if (rolePermissions.includes('*')) {
    return true;
  }

  return rolePermissions.includes(permission);
}