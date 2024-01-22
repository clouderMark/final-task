import {Router} from 'express';
import CollectionController from '../controlers/Collection';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

router.get('/getuserall', authMiddleware, CollectionController.getAll);
router.get('/getall', CollectionController.getAbsolutelyAll);
router.get('/getone/:id([0-9]+)', CollectionController.getOne);
router.post('/create', authMiddleware, CollectionController.create);
router.put('/update/:id([0-9]+)', authMiddleware, CollectionController.update);
router.delete('/delete/:id([0-9]+)', authMiddleware, CollectionController.delete);

export default router;
