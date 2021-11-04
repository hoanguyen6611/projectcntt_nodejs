const express = require('express');
const router = express.Router();
const docController = require('../app/controllers/DocController');
router.get('/create', docController.create);
router.post('/store', docController.store);
router.get('/:id/edit', docController.edit);
router.put('/:id', docController.update);
router.get('/', docController.index);
router.get('/:slug', docController.showItems);
module.exports = router;
