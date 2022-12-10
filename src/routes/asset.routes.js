const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const assetController = require('../controllers/asset.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/asset', auth(), assetController.setAsset);
router.get('/asset', auth(), assetController.getAllAsset);
router.get('/asset/:id', auth(), assetController.getAsset);
router.put('/asset/:id', auth(), assetController.updateAsset);
router.delete('/asset/:id', auth(), assetController.deleteAsset);

module.exports = router;
