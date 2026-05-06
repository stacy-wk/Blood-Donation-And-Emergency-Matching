export function createUser({
  id,
  name,
  email,
  role,
  phone
}) {
  return {
    id,
    name,
    email,
    role,
    phone,
    createdAt: new Date().toISOString()
  };
}