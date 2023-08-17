import { Router } from 'express';
import getLocationTypes from './locationTypes.handler.js';

const router = Router();

router.get('/', getLocationTypes);

export default router;
