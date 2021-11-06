const express = require("express");
const { signup, signin } = require("./users.controllers");
const passport = require("passport");
const router = express.Router();

router.post("/signup", signup);
router.post(
  "/signin/",
  passport.authenticate("local", { session: false }),
  signin
);
module.exports = router;
