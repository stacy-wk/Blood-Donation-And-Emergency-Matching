import { can } from "../core/ability.js";

export const rbac = (permission) => {
  return (req, res, next) => {
    const user = req.user;

    if (!user) {
      return res.status(401).json({
        message: "Unauthorized: No user context"
      });
    }

    const allowed = can(user.role, permission);

    if (!allowed) {
      return res.status(403).json({
        message: `Forbidden: Missing permission (${permission})`
      });
    }

    next();
  };
};