import {Router} from 'express';
import UserController from '../controlers/User';
import authMiddleware from '../middleware/authMiddleware';
import adminMiddleware from '../middleware/adminMiddleware';

const router = Router();

router.post('/signup', UserController.signup);
router.post('/login', UserController.login);
router.get('/check', authMiddleware, UserController.check);

router.get('/getall', authMiddleware, adminMiddleware, UserController.getAll);
router.get('/getone/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.getOne);
router.post('/create', authMiddleware, adminMiddleware, UserController.create);
router.put('/update/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.delete);

router.put('/changerole/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.changeRole);
router.put('/changestatus/:id([0-9]+)', authMiddleware, adminMiddleware, UserController.changeStatus);

export default router;
