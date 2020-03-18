const path = require("path");
const express = require("express");
const hbs = require("hbs");
var request = require("request");
var Handlebars = require("hbs");

const app = express();
const port = process.env.PORT || 3000;

const publicDirectoryPath = path.join(__dirname, "public");
app.use(express.static(publicDirectoryPath));

app.set("view engine", "hbs");
const viewsPath = path.join(__dirname, "views");
app.set("views", viewsPath);

// Handlebars.registerHelper("json", function(context) {
//   return JSON.stringify(context);
// });

app.get("/", (req, res) => {
  //total world
  var options1 = {
    method: "GET",
    url: "https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php",
    json: true,
    headers: {
      "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
      "x-rapidapi-key": "8ca55d83ccmsha37b92cc7723a3cp17ec51jsnb62a8633e050"
    }
  };

  request(options1, function(error, response, body) {
    if (error) throw new Error(error);

    console.log("total cases: around the World is: " + body.total_cases);

    const total_cases = body.total_cases;
    console.log("total deaths :" + body.total_deaths);

    //india cases
    var options2 = {
      method: "GET",
      url:
        "https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php",
      json: true,
      headers: {
        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
        "x-rapidapi-key": "8ca55d83ccmsha37b92cc7723a3cp17ec51jsnb62a8633e050"
      }
    };

    request(options2, function(error, response, body1) {
      if (error) throw new Error(error);
      let d = JSON.stringify(body1);
      let sta = body1.statistic_taken_at;
      console.log(d);
      console.log(sta);

      res.render("index", {
        title: "DATA",
        tc: body.total_cases,
        td: body.total_deaths,
        tr:body.total_recovered,
        tnc:body.new_cases,
        tnd:body.new_deaths,
          
        hello: d,
        sta
      });
    });
  });
});

app.get("/instruction", (req, res) => {
  res.render("instruction");
});

app.get("/myth", (req, res) => {
  res.render("myth");
});

app.listen(port, () => {
  console.log("Server is Up on Port" + port);
});
