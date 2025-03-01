const express = require("express"),
  router = express.Router();
const userRoutes = require("./routes");
router.get("/", userRoutes.get);

module.exports = router;
