"use strict"

const express = require("express");
const dbconfig = require("./dbconfig.json");

const app = express();

const port = process.env.port || 3000;

app.get("/", (req, res) => {
    res.send("Hello World");
})

app.listen(3000, "localhost", () => {
    console.log("!!!");
})