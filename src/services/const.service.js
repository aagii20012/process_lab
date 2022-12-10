const httpStatus = require('http-status');
const { ConstAsset } = require('../models');
const ApiError = require('../utils/ApiError');
const { Op } = require('sequelize');

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

const createConstAsset = async (ConstAssetBody, usedId) => {
  const data = {
    ...ConstAssetBody,
    userId: usedId,
  };
  return ConstAsset.create(data);
};

const getConstAssets = async (usedId, filter) => {
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
  return ConstAsset.findAll({ where: select });
};

const getConstAsset = async (ConstAssetId, usedId) => {
  let select = {
    constAssetId: ConstAssetId,
    userId: usedId,
  };
  return ConstAsset.findOne({ where: select });
};

const updateConstAsset = async (ConstAssetId, usedId, updateBody) => {
  const ConstAsset = await getConstAsset(ConstAssetId, usedId);
  if (!ConstAsset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ConstAsset not found');
  }
  Object.assign(ConstAsset, updateBody);
  await ConstAsset.save();
  return ConstAsset;
};

const deleteConstAsset = async (ConstAssetId, usedId) => {
  const ConstAsset = await getConstAsset(ConstAssetId, usedId);
  if (!ConstAsset) {
    throw new ApiError(httpStatus.NOT_FOUND, 'ConstAsset not found');
  }
  await ConstAsset.destroy();
  return ConstAsset;
};

module.exports = {
  createConstAsset,
  getConstAssets,
  getConstAsset,
  updateConstAsset,
  deleteConstAsset,
};
