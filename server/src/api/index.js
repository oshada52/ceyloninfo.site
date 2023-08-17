import express from 'express';
import locations from './locations/locations.routes.js';
import locationTypes from './location_types/locatoinTypes.routes.js';
import geojson from './geojson/geojson.routes.js';

const router = express.Router();

router.get('/', (req, res) => {
  res.json({
    message: 'api',
  });
});

router.use('/locations', locations);
router.use('/locationtypes', locationTypes);
router.use('/geojson', geojson);

export default router;
