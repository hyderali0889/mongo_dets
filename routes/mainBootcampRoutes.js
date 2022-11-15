const express = require("express");
const router = express.Router();
const {
  createBootcamp,
  deleteBootcamp,
  getBootcamp,
  updateBootcamp,
  getSingleBootcamp,
} = require("../controllers/bootcampsController");

router.route("/").get(getBootcamp).post(createBootcamp);

router
  .route("/:id")
  .put(updateBootcamp)
  .delete(deleteBootcamp)
  .get(getSingleBootcamp);

module.exports = router;
