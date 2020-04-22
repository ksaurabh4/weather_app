const request = require('request');

const weather = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=4cd2d1459f7370412ea9c0d5d6af3fd6&query=${long},${lat}`;
  request({ url: url, json: true }, (error, data) => {
    if (error) {
      callback('Unable to reach weather services!', undefined);
    } else if (data.body.error) {
      callback('Unable to get the Weather of given Location!', undefined);
    } else {
      callback(undefined, {
        localTime: data.body.location.localtime,
        actualTemp: data.body.current.temperature,
        feelLikeTemp: data.body.current.feelslike,
        humidity: data.body.current.humidity,
      });
    }
  });
};

module.exports = weather;
