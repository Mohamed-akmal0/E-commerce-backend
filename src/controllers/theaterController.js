const theaterSignup = (req, res) => {
  try {
    const { name, email, password } = req.body;
  } catch (error) {
    res.status(400).json({ errMessage: error.message });
  }
};

module.exports = {
    theaterSignup
}