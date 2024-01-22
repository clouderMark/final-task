import {Router} from 'express';
import user from './user';
import collection from './collection';
import item from './item';

const router = Router();

router.use('/user', user);
router.use('/collection', collection);
router.use('/item', item);

export default router;
