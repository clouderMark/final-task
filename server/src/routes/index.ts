import {Router} from 'express';
import user from './user';
import collection from './collection';

const router = Router();

router.use('/user', user);
router.use('/collection', collection);

export default router;
