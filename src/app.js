const express = require("express");
const path = require("path");
const hbs = require("hbs"); // <--Partials ka code
const app = express();
const bodyParser = require("body-parser");
const port = process.env.PORT || 80;

require("./db/conn"); // including Conn file
const WeatherlyCollection = require("./models/schema"); // Including Schema file

// Public Static Path
const static_path = path.join(__dirname, "../public"); // <--static stuff ka path
const template_path = path.join(__dirname, "../templates/views"); // <--- views dir ka path
const partials_path = path.join(__dirname, "../templates/partials"); // <--- Partials dir ka path

// If we dont using POSTMAN
app.use(express.json());

// To get Form Data
app.use(express.urlencoded({ extended: false }));

// To use Body-Parser
app.use(bodyParser.urlencoded({ extended: true }));

// View Engine Specific
app.set("view engine", "hbs");
app.set("views", template_path); // views folder changed to templates
hbs.registerPartials(partials_path); //<= hbs nay partials dir ko register kr liya &&  Auto-Save K Leye => nodemon src/app.js -e js,hbs

app.use(express.static(static_path));

// End Points -- Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/weather", (req, res) => {
  res.render("weather");
});
app.get("/contact", (req, res) => {
  res.render("contact");
});
app.post("/contact", async (req, res) => {
  const PostWeatherly = new WeatherlyCollection({
    name: req.body.name,
    email: req.body.email,
    phone: req.body.phone,
    message: req.body.message,
  });
  PostWeatherly.save();
  res.redirect("/");
});

app.get("*", (req, res) => {
  //   <----- Asterik--
  res.render("404error", {
    errorMsg: "OOPS..! Page not found",
  });
});

// Listening on this Port
app.listen(port, () => {
  console.log(`Listening to the port at ${port}`);
});

////////////////////////////// Mongo DB //////////////////////////////////////////////
