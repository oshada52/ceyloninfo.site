import pool from '../../db.js';

class dataObj {
  id;
  name;
  icon;
  geojson = [];

  addGeoData(data) {
    this.geojson.push(data);
  }

  constructor(id, name, icon) {
    this.id = id;
    this.name = name;
    this.icon = icon;
  }
}

class geoObj {
  type = 'Feature';

  constructor(name, long, lat, icon) {
    this.geometry = { type: 'Point', coordinates: [long, lat] };
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
      const obj = new dataObj(types[i].id, types[i].name, types[i].icon_link);
      for (let y = 0; y < locations.length; y++) {
        if (types[i].id === locations[y].type) {
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
