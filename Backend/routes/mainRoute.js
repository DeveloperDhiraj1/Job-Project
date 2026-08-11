import express from 'express';
import userRoutes from '../modules/user/user.route.js';
import companyRoutes from '../modules/user/company/company.rout.js';

const router = express.Router();
router.use('/user', userRoutes);
router.use('/company', companyRoutes);

export default router;