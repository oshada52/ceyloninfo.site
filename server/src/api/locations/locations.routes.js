import { Router } from 'express';
import getLocations from './locations.handler.js';

const router = Router();

router.get('/', getLocations);

export default router;
