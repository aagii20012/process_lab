const express = require('express');
const validate = require('../middlewares/validate');
const authValidation = require('../validations/auth.validation');
const constController = require('../controllers/const.controller');
const auth = require('../middlewares/auth');

const router = express.Router();

router.post('/Const', auth(), constController.setConst);
router.get('/Const', auth(), constController.getAllConst);
router.get('/Const/:id', auth(), constController.getAssetConst);
router.put('/Const/:id', auth(), constController.updateConst);
router.delete('/Const/:id', auth(), constController.deleteConst);

module.exports = router;
