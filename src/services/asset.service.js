const httpStatus = require('http-status');
const { Asset } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

const createAsset = async (assetBody, usedId) => {
  const data = {
    ...assetBody,
    userId: usedId,
  };
  return Asset.create(data);
};

const createFromConst = async (assetBody, usedId) => {
  const data = {
    title: assetBody.title,
    type: assetBody.type,
    amount: assetBody.amount,
    userId: usedId,
  };
  return Asset.create(data);
};

function getLastWeek() {
  var today = new Date(Date.now());
  var lastWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 6);
  return lastWeek;
}
function getLastMonth() {
  var today = new Date(Date.now());
  var lastWeek = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
  return lastWeek;
}
function getLastYear() {
  var today = new Date(Date.now());
  var lastWeek = new Date(today.getFullYear() - 1, today.getMonth(), today.getDate());
  return lastWeek;
}

const getAssets = async (usedId, filter) => {
  let select = {
    userId: usedId,
  };
  if (filter.type != undefined) {
    select['type'] = filter.type;
  }
  if (filter.dateType != undefined) {
    start = new Date(Date.now());
    switch (filter.dateType) {
      case 'W':
        start = getLastWeek();
        break;
      case 'M':
        start = getLastMonth();
        break;
      case 'Y':
        start = getLastYear();
        break;
      default:
    }
    select['createdAt'] = {
      [Op.gte]: start,
    };
  }
  console.log(select);
  return Asset.findAll({ where: select });
};

const getAsset = async (assetId, usedId) => {
  let select = {
    assetId: assetId,
    userId: usedId,
  };
  return Asset.findOne({ where: select });
};

const updateAsset = async (assetId, usedId, updateBody) => {
  const asset = await getAsset(assetId, usedId);
  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'asset not found');
  }
  Object.assign(asset, updateBody);
  await asset.save();
  return asset;
};

const deleteAsset = async (assetId, usedId) => {
  const asset = await getAsset(assetId, usedId);
  if (!asset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'asset not found');
  }
  await asset.destroy();
  return asset;
};

module.exports = {
  createAsset,
  getAssets,
  getAsset,
  updateAsset,
  deleteAsset,
  createFromConst,
};
