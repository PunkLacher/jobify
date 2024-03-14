import { StatusCodes } from "http-status-codes";
import User from "../models/UserModel.js";
import { comparePassword, hashPassword } from "../utils/passwordUtils.js";
import { UnauthenticatedError } from "../errors/customErrors.js";
import { createJWT } from "../utils/tokenUtils.js";

//register controller sets the first registred user as an admin
//it first counts doucments in the databse, and if their are 0
//then this will be the first user. IF its first user then it
//sets the role property of req.body to 'admin'
export const register = async (req, res) => {
  const isFirstAccount = (await User.countDocuments()) === 0;
  req.body.role = isFirstAccount ? "admin" : "user";

  const hashedPassword = await hashPassword(req.body.password);
  req.body.password = hashedPassword;

  const user = await User.create(req.body);
  res.status(StatusCodes.CREATED).json({ msg: "user created" });
};

export const login = async (req, res) => {
  //first find user and set to user variable
  const user = await User.findOne({ email: req.body.email });

  //check if user is found and password matches
  const isValidUser =
    user && (await comparePassword(req.body.password, user.password));

  //throw invalid credntials error if no match
  if (!isValidUser) throw new UnauthenticatedError("invalid credentials");

  //create JWT token and send in response cookie
  const token = createJWT({ userId: user._id, role: user.role });

  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure:process.env.NODE_ENV === 'production'
  })
  res.status(StatusCodes.OK).json({msg:'user logged in'});
};

export const logout = (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({msg: 'user logged out!'})
}
