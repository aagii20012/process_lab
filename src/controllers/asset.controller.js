const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { assetService, profleService } = require('../services');

const getAllAsset = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  let assets = {};
  assets = await assetService.getAssets(userId, req.body);
  res.status(httpStatus.OK).send({ assets });
});

const getAsset = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const assets = await assetService.getAsset(id, userId);
  if (assets) {
    res.status(httpStatus.OK).send({ assets });
  } else {
    res.status(httpStatus.NOT_FOUND).send({ assets });
  }
});

const setAsset = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const asset = await assetService.createAsset(req.body, userId);
  res.status(httpStatus.CREATED).send({ asset });
});

const updateAsset = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const asset = await assetService.updateAsset(id, userId, req.body);
  res.status(httpStatus.OK).send({ asset });
});

const deleteAsset = catchAsync(async (req, res) => {
  const bearerHeader = req.headers.authorization;
  const parts = bearerHeader.split(' ');
  if (parts.length === 2) {
    token = parts[1];
  }
  const userId = await profleService.getUserByToken(token);
  const id = req.params.id;
  const asset = await assetService.deleteAsset(id, userId, req.body);
  res.status(httpStatus.OK).send({ asset });
});

module.exports = {
  getAllAsset,
  getAsset,
  setAsset,
  updateAsset,
  deleteAsset,
};
