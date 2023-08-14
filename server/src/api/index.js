import express from 'express';
import locations from './locations/locations.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api',
  });
});

router.use('/locations', locations);

export default router;
