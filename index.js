"use strict";

const express = require("express");
const dbconfig = require("./dbconfig.json");

const app = express();
app.use(express.json());
const port = process.env.port || 3000;

const v1Route = require("./v1");

app.use("/api/v1", v1Route);

app.listen(port, "localhost", () => {
	console.log(`Server listening on port ${port}...`);
});
