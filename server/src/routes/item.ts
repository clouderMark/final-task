import {Router} from 'express';
import ItemController from '../controlers/Item';

const router = Router();

router.get('/getall', ItemController.getAll);

export default router;
