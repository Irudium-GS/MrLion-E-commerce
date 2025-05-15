import jwt from 'jsonwebtoken';

export const protect = (req, res, next) => {
  try {
    // Check for token in cookies
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: 'Not authorized, no token' });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach user information to the request object
    req.user = decoded;

    next();
  } catch (error) {
    console.error('Authorization error:', error.message);
    res.status(401).json({ message: 'Not authorized, invalid token' });
  }
};