const router = require("express").Router()
const { theaterSignup } = require("../controllers/theaterController")

router.post("/signup", theaterSignup)

module.exports = router