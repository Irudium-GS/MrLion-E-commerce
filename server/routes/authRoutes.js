import express from 'express';
import { register, login, logout, getMe } from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);
router.get('/me', protect, getMe);

export default router;

// import express from 'express';
// import { register, login, logout, getMe } from '../controllers/authController.js';
// import { protect } from '../middleware/auth.js';

// const router = express.Router();

// // Public routes
// router.post('/register', register);
// router.post('/login', login);

// // Protected routes
// router.post('/logout', protect, logout);
// router.get('/me', protect, getMe);

// export default router;