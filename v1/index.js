const express = require("express");
const router = express.Router();

module.exports = router;

const userRoute = require("./routes/user");

router.use("/user", userRoute);
