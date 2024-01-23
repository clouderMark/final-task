import {Router} from 'express';
import ItemController from '../controlers/Item';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/getall', ItemController.getAll);
router.post('/create', authMiddleware, ItemController.create);

export default router;
