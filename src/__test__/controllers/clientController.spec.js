const { signupController } = require("../../controllers/clientController");
const userSchema = require("../../models/userModel");
const { hashPassword } = require("../../helpers/helperFunctions");

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
    id: 1,
    email: "email",
    password: "password",
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
