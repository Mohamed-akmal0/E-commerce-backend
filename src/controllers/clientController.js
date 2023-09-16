module.exports.signupController = (req, res) => {
  try {
    const body = req?.body;
    console.log("body in controller", body);
  } catch (error) {
    console.log("err in signup controller", err);
    res.status(400).json({
      message: "Error",
      value: error,
    });
  }
};
