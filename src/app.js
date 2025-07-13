const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//Define path for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialspath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialspath);

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "vikrant M.",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "about",
    name: "vikrant M.",
  });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "you must provide a search term",
    });
  }
  res.send({
    product: [],
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Its help page",
    name: "vikrant M.",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send("provide a valid address");
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({
          error: "you must provide a valid address",
        });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: forecastData,
          location,
          address: req.query.address,
        });
      });
    }
  );
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "vikrant M.",
    errormessage: "its error",
  });
});

app.listen(3000, () => {
  console.log("server is listining on 3000");
});
