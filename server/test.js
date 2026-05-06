// test.js
import { ROLES } from './src/core/roles.js';
import { PERMISSIONS } from './src/core/permissions.js';
import { ROLE_PERMISSIONS } from './src/core/permissions.js';
import { can } from './src/core/ability.js';

const admin = { role: ROLES.SYSTEM_ADMIN };
const donor = { role: ROLES.DONOR };

console.log('Admin can manage users:', can(admin, PERMISSIONS.MANAGE_USERS));
console.log('Donor can manage users:', can(donor, PERMISSIONS.MANAGE_USERS));
console.log('Donor can view profile:', can(donor, PERMISSIONS.VIEW_OWN_PROFILE));
console.log(ROLES);
console.log(ROLE_PERMISSIONS);