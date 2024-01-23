import {Router} from 'express';
import ItemController from '../controlers/Item';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/getall', ItemController.getAll);
router.post('/create', authMiddleware, ItemController.create);
router.get('/getbyid/:id([0-9]+)', ItemController.getAllById);

export default router;
