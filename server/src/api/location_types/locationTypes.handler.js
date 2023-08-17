import pool from '../../db.js';

const getLocationTypes = (req, res) => {
  pool.query('SELECT * FROM location_types', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default getLocationTypes;
