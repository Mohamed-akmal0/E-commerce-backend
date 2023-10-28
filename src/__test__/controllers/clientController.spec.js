const {
  signupController,
  loginController,
} = require("../../controllers/clientController");
const userSchema = require("../../models/userModel");
const { hashPassword } = require("../../helpers/helperFunctions");
const bcrypt = require("bcrypt");

//mocking database
//because on unit testing , testing should be fast so we have to mock the db not to call actual db
jest.mock("../../models/userModel");
//mocking hash password function
jest.mock("../../helpers/helperFunctions", () => ({
  hashPassword: jest.fn((x) => x),
}));

//creating mock request data
const req = {
  body: {
    email: "fake_email",
    password: "fake_password",
  },
};
//creating mock response data
const res = {
  status: jest.fn().mockReturnThis(), // Mock the status function and return 'this' for chaining
  json: jest.fn(),
};

it("should return status code 400 when user exist", async () => {
  userSchema.findOne.mockImplementationOnce(() => ({
    email: req.body.email,
  }));
  await signupController(req, res);
  expect(res.status).toHaveBeenCalledWith(400);
  expect(res.json).toHaveBeenCalledWith({
    errMessage: "email already in use",
  });
});

it("should return status code 201 when user created", async () => {
  userSchema.findOne.mockResolvedValueOnce(undefined);
  userSchema.prototype.save.mockResolvedValue();
  await signupController(req, res);
  expect(hashPassword).toHaveBeenCalledWith("fake_password");
  expect(userSchema.prototype.save).toHaveBeenCalledTimes(1);
  expect(res.status).toHaveBeenCalledWith(201);
  expect(res.json).toHaveBeenCalledWith({
    message: "user stored successfully",
  });
});

//test cases for login controller function
it("should return status code 401 when email is wrong ", async () => {
  userSchema.findOne.mockResolvedValueOnce(undefined);
  await loginController(req, res);
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({ message: "incorrect email" });
});

it("should return status code 401 when password is wrong", async () => {
  const userData = userSchema.findOne.mockImplementationOnce(() => ({
    email: req.body.email,
  }));
  jest.spyOn(bcrypt, "compare").mockResolvedValue(false);
  await loginController(req, res);
  expect(userSchema.findOne).toHaveBeenCalledWith({ email: req.body.email });
  expect(bcrypt.compare).toHaveBeenCalledWith(
    req.body.password,
    userData.password
  );
  expect(res.status).toHaveBeenCalledWith(401);
  expect(res.json).toHaveBeenCalledWith({
    message: "incorrect password",
  });
});

it("should return status code 200 when user get login", async () => {
  const userData = userSchema.findOne.mockImplementationOnce(() => ({
    email: req.body.email,
  }));
  jest.spyOn(bcrypt, "compare").mockResolvedValue(true);
  await loginController(req, res);
  expect(userSchema.findOne).toHaveBeenCalledWith({ email: req.body.email });
  expect(bcrypt.compare).toHaveBeenCalledWith(
    req.body.password,
    userData.password
  );
  expect(res.status).toHaveBeenCalledWith(200);
  expect(res.json).toHaveBeenCalledWith({
    message: "success",
    data: { id: userData.id, email: req.body.email },
  });
});
