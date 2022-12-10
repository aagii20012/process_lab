const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { constService, profleService } = require('../services');

const getAllConst = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  let assets = {};
  assets = await constService.getConstAssets(userId, req.body);
  res.status(httpStatus.OK).send({ assets });
});

const getAssetConst = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const assets = await constService.getConstAsset(id, userId);
  if (assets) {
    res.status(httpStatus.OK).send({ assets });
  } else {
    res.status(httpStatus.NOT_FOUND).send({ assets });
  }
});

const setConst = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const asset = await constService.createConstAsset(req.body, userId);
  res.status(httpStatus.CREATED).send({ asset });
});

const updateConst = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const asset = await constService.updateConstAsset(id, userId, req.body);
  res.status(httpStatus.OK).send({ asset });
});

const deleteConst = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const asset = await constService.deleteConstAsset(id, userId, req.body);
  res.status(httpStatus.OK).send({ asset });
});

module.exports = {
  getAllConst,
  getAssetConst,
  setConst,
  updateConst,
  deleteConst,
};
