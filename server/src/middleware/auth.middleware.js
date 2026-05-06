import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 1. Check header format
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      message: "Authorization token missing or malformed"
    });
  }

  const token = authHeader.split(" ")[1];

  // 2. Check env
  if (!process.env.JWT_SECRET) {
    console.error("JWT_SECRET is not defined");
    return res.status(500).json({
      message: "Server configuration error"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 3. Validate decoded payload
    if (!decoded || !decoded.role) {
      return res.status(401).json({
        message: "Invalid token payload"
      });
    }

    // 4. Attach clean user object
    req.user = {
      id: decoded.id,
      role: decoded.role,
      email: decoded.email
    };

    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token"
    });
  }
};