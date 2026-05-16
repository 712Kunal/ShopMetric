import ApiError from '../utils/ApiError.js';

const roleGuard =
  (...allowedRoles) =>
  (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, 'Access Denied'));
    }

    next();
  };

export default roleGuard;
