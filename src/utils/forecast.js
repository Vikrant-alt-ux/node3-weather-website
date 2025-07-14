const request = require("request");

const forecast = (latitude, longitude, callback) => {
  const url = `https://api.weatherstack.com/current?access_key=bba5f101229bde1a7d33416d2302f428&query=${latitude},${longitude}&units=f`;

  request({ url: url, json: true }, (error, { body }) => {
    if (error) {
      callback("unable to connect the server", undefined);
    } else if (body.error) {
      callback("Unable to connect weather services", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          ". it is currently " +
          body.current.temperature +
          " degree out. it feels like " +
          body.current.feelslike +
          " degress out . the humidity is " +
          body.current.humidity +
          "%"
      );
    }
  });
};

module.exports = forecast;
``;
