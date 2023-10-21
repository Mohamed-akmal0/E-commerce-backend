const router = require("express").Router();
const {
  adminLogin,
  getNonApprovedTheaterAccounts,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/nonApprovedTheater", getNonApprovedTheaterAccounts);

module.exports = router;
