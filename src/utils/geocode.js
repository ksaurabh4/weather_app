const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?types=address&access_token=pk.eyJ1Ijoia3NhdXJhYmgiLCJhIjoiY2s5M3cwZ3duMDZtcjNpbjFhamtma25uOSJ9.-JwG_P_duhYcE2mECyQ6ow&limit=1`;

  request({ url: url, json: true }, (error, data) => {
    if (error) {
      callback('Unable to connect Location services!', undefined);
    } else if (data.body.features.length === 0) {
      callback(
        'Unable to find the given location. Try another location!',
        undefined
      );
    } else {
      callback(undefined, {
        location: data.body.features[0].place_name,
        latitude: data.body.features[0].center[0],
        longitude: data.body.features[0].center[1],
      });
    }
  });
};

module.exports = geocode;
