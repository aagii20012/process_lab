const httpStatus = require('http-status');
const { User, Token } = require('../models');
const { tokenTypes } = require('../config/tokens');
const tokenService = require('./token.service');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');

const loginUserWithEmailAndPassword = async (email, password) => {
  const user = await getUserByEmail(email);
  if (!user || !isPasswordMatch(password, user.password)) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

function isPasswordMatch(password, enc_pass) {
  return bcrypt.compareSync(password, enc_pass);
}

const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({
    token: refreshToken,
    type: 'refresh',
    blacklisted: false,
  });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.destroy();
};

const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.destroy();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};

const createUser = async (userBody) => {
  await User.findOne({ where: { email: userBody.email } }).then((user) => {
    if (user) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
    }
  });
  return await User.create(userBody);
};

const getUserByEmail = async (email) => {
  return User.findOne({ email: email });
};

const resetPassword = async (resetPasswordToken, newPassword) => {
  try {
    const resetPasswordTokenDoc = await tokenService.verifyToken(resetPasswordToken, tokenTypes.RESET_PASSWORD);
    const user = await userService.getUserById(resetPasswordTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await userService.updateUserById(user.id, { password: newPassword });
    await Token.deleteMany({ user: user.id, type: tokenTypes.RESET_PASSWORD });
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password reset failed');
  }
};

module.exports = {
  loginUserWithEmailAndPassword,
  createUser,
  logout,
  refreshAuth,
  resetPassword,
};
