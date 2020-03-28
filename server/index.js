const express = require("express");
const path = require("path");
const app = express();
const bodyParser = require("body-parser");

app.set("views", path.join(__dirname, "../source/template/pages"));
app.set("view engine", "pug");

app.use(express.static(path.join(__dirname, "../public")));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/", require("./routes"));

app.listen(3000, () => {
    console.log("RUN NA PORTY 3000");
});
