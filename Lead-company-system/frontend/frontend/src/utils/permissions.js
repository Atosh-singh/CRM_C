export const hasPermission = (user, permission) => {

  if (!user || !permission) return false;

  if (!Array.isArray(user.permissions)) {
    return false;
  }

  return user.permissions.includes(permission);

};


export const canAccess = (user, permission) => {

  if (!user) return false;

  // If no permission required allow access
  if (!permission) return true;

  // Admin bypass
  if (user.role === "ADMIN" || user.role === "SUPER_ADMIN") {
    return true;
  }

  return hasPermission(user, permission);

};