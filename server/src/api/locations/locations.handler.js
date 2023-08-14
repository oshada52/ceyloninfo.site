import pool from '../../db.js';

const getLocations = (req, res) => {
  pool.query('SELECT * FROM locations', (error, results) => {
    if (error) throw error;
    res.status(200).json(results.rows);
  });
};

export default getLocations;
