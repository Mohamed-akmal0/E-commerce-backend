const router = require("express").Router();
const {
  adminLogin,
  getNonApprovedTheaterAccounts,
  getApproveTheater,
  getRejectTheater,
  getAllApprovedTheater,
} = require("../controllers/adminController");

router.post("/login", adminLogin);
router.get("/nonApprovedTheater", getNonApprovedTheaterAccounts);
router.patch("/approveTheater/:id", getApproveTheater);
router.patch("/rejectTheater/:id", getRejectTheater);
router.get('/allApprovedTheater', getAllApprovedTheater);

module.exports = router;
