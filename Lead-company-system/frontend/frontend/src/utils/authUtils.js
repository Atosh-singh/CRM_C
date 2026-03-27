export const isAdmin = (user) =>
  user?.role === "ADMIN" || user?.role === "SUPER_ADMIN";

export const canAccess = (user, permission) => {
  if (isAdmin(user)) return true;
  if (!permission) return true;
  return user?.permissions?.includes(permission);
};