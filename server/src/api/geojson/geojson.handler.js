import pool from '../../db.js';

class dataObj {
  id;
  name;
  geojson = [];

  addGeoData(data) {
    this.geojson.push(data);
  }

  constructor(id, name) {
    this.id = id;
    this.name = name;
    this.icon = `https://img.icons8.com/color/40/elephant.png`;
  }
}

class geoObj {
  type = 'Feature';

  constructor(name, long, lat) {
    this.geometry = { type: 'Points', coordinates: [long, lat] };
    this.properties = { title: name };
  }
}

function getLocations() {
  return new Promise((resolve) => {
    pool.query('SELECT * FROM locations', (error, results) => {
      if (error) throw error;
      resolve(results.rows);
    });
  });
}

function getTypes() {
  return new Promise((resolve) => {
    pool.query('SELECT * FROM location_types', (error, results) => {
      if (error) throw error;
      resolve(results.rows);
    });
  });
}

const getGeojson = async (req, res) => {
  async function send() {
    let geojson = [];

    const locations = await getLocations();
    const types = await getTypes();

    for (let i = 0; i < types.length; i++) {
      const id = types[i].id;
      const obj = new dataObj(id, types[i].name);
      for (let y = 0; y < locations.length; y++) {
        if (id === locations[y].type) {
          const obj2 = new geoObj(
            locations[y].name,
            locations[y].longitude,
            locations[y].latitude
          );
          obj.addGeoData(obj2);
        }
      }
      geojson.push(obj);
    }

    res.send(geojson);
  }

  send();
};

export default getGeojson;
