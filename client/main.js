const locationsTypes = [
  {
    id: 1,
    name: 'fort',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.215083, 6.030112],
        },
        properties: {
          title: 'Gall Fort',
        },
      },
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.760033, 7.957173],
        },
        properties: {
          title: 'Sigiriya',
        },
      },
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.008354, 9.662541],
        },
        properties: {
          title: 'Dutch Fort Jaffna',
        },
      },
    ],
    icon: 'https://img.icons8.com/external-bearicons-flat-bearicons/40/external-Fort-location-bearicons-flat-bearicons.png',
  },
  {
    id: 2,
    name: 'tower',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [79.858235, 6.926879],
        },
        properties: {
          title: 'Lotus Tower',
        },
      },
    ],
    icon: 'https://img.icons8.com/cotton/40/airport-tower--v2.png',
  },
  {
    id: 3,
    name: 'buddhist site',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.499358, 6.809223],
        },
        properties: {
          title: 'Sri Paadaya Peak',
        },
      },
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.621878, 7.497631],
        },
        properties: {
          title: 'Aluviharaya',
        },
      },
    ],
    icon: 'https://img.icons8.com/external-flaticons-flat-flat-icons/40/external-monk-religion-flaticons-flat-flat-icons.png',
  },
  {
    id: 4,
    name: 'park',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.817463, 6.42428],
        },
        properties: {
          title: 'Udawalawa Park',
        },
      },
    ],
    icon: 'https://img.icons8.com/color/40/elephant.png',
  },
  {
    id: 5,
    name: 'harbour',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [81.231191, 8.56692],
        },
        properties: {
          title: 'Trincomalee Harbour',
        },
      },
    ],
    icon: 'https://img.icons8.com/color/40/anchor.png',
  },
  {
    id: 6,
    name: 'beach',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.450314, 5.943488],
        },
        properties: {
          title: 'Secret Beach Mirissa',
        },
      },
    ],
    icon: 'https://img.icons8.com/color/40/beach.png',
  },
  {
    id: 7,
    name: 'trail',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [81.060482, 6.864914],
        },
        properties: {
          title: "Little Adam's Peak Trailhead",
        },
      },
    ],
    icon: 'https://img.icons8.com/color/40/trekking-skin-type-3.png',
  },
  {
    id: 8,
    name: 'trail',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [81.060482, 6.86926],
        },
        properties: {
          title: "Little Adam's Peak",
        },
      },
    ],
    icon: 'https://img.icons8.com/ios-filled/40/40C057/mountain.png',
  },
  {
    id: 9,
    name: 'trail',
    geojson: [
      {
        // feature for Mapbox DC
        type: 'Feature',
        geometry: {
          type: 'Point',
          coordinates: [80.085336, 6.131271],
        },
        properties: {
          title: 'Black Coral Point',
        },
      },
    ],
    icon: 'https://img.icons8.com/external-flaticons-lineal-color-flat-icons/40/external-scuba-diving-water-sport-flaticons-lineal-color-flat-icons.png',
  },
];

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_TOKEN;

const bounds = [
  [75.312182, 3.983108], // southwestern corner of the bounds
  [84.714728, 12.572659], // northeastern corner of the bounds
];

const map = new mapboxgl.Map({
  container: 'map', // container ID
  // Choose from Mapbox's core styles, or make your own style with Mapbox Studio
  style: 'mapbox://styles/dwoshada/clkuzu71j001r01pb1pkabp00/draft', // style URL
  center: [80.738662, 7.840042], // starting position [lng, lat]
  zoom: 7,
  maxBounds: bounds,
});

async function getLocations() {
  const response = await fetch('http://ceyloninfo.site/api/locations');

  return response.json();
}

// getLocations().then((locations) => {
//   map.on('load', () => {
//     // Add an image to use as a custom marker
//     for (let i = 0; i < locations.length; i++) {
//       // console.log([locations[i].longitude, locations[i].id]);
//       map.loadImage(
//         'https://img.icons8.com/stickers/40/airplane-landing.png',
//         (error, image) => {
//           if (error) throw error;
//           map.addImage(`custom-marker${i}`, image);
//           // Add a GeoJSON source with 2 points
//           map.addSource(`points${i}`, {
//             type: 'geojson',
//             data: {
//               type: 'FeatureCollection',
//               features: [
//                 {
//                   // feature for Mapbox DC
//                   type: 'Feature',
//                   geometry: {
//                     type: 'Point',
//                     coordinates: [
//                       locations[i].longitude,
//                       locations[i].latitude,
//                     ],
//                   },
//                   properties: {
//                     title: locations[i].name,
//                   },
//                 },
//               ],
//             },
//           });
//           // Add a symbol layer
//           map.addLayer({
//             id: `points${i}`,
//             type: 'symbol',
//             source: `points${i}`,
//             layout: {
//               'icon-image': `custom-marker${i}`,
//               // get the title name from the source's "title" property
//               'text-field': ['get', 'title'],
//               'text-font': ['Poppins Regular', 'Arial Unicode MS Bold'],
//               'text-offset': [0, 1.25],
//               'text-anchor': 'top',
//             },
//           });
//         }
//       );
//       map.on('click', `points${i}`, () => {
//         alert(`points${i}`);
//       });
//     }
//   });
// });

for (let i = 0; i < locationsTypes.length; i++) {
  map.on('load', () => {
    // Add an image to use as a custom marker
    map.loadImage(`${locationsTypes[i].icon}`, (error, image) => {
      if (error) throw error;
      map.addImage(`custom-marker${i}`, image);
      // Add a GeoJSON source with 2 points
      map.addSource(`points${i}`, {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: locationsTypes[i].geojson,
        },
      });

      // Add a symbol layer
      map.addLayer({
        id: `points${i}`,
        type: 'symbol',
        source: `points${i}`,
        layout: {
          'icon-image': `custom-marker${i}`,
          // get the title name from the source's "title" property
          'text-field': ['get', 'title'],
          'text-font': ['Overpass SemiBold', 'Arial Unicode MS Bold'],
          'text-offset': [0, 1.7],
          'text-size': 12,
          'text-letter-spacing': 0.02,
          'text-anchor': 'top',
        },
      });
    });
  });

  map.on('click', `points${i}`, () => {
    alert(`${locationsTypes[i].name}`);
  });
}
