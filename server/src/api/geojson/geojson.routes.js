import { Router } from 'express';
import getGeojson from './geojson.handler.js';

const router = Router();

router.get('/', getGeojson);

export default router;
