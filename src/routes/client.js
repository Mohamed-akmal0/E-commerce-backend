const router = require("express").Router();
const { signupController } = require("../controllers/clientController");

router.post("/signup", signupController);
router.post("/login");

module.exports = router;
