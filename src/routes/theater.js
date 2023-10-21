const router = require("express").Router();
const {
  theaterSignup,
  theaterLogin,
} = require("../controllers/theaterController");

router.post("/signup", theaterSignup);
router.post("/login", theaterLogin);

module.exports = router;
