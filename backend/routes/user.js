'use strict';

var express = require('express');
var userController = require('../controllers/user');
var router = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart({ uploadDir: './uploads-user' });

router.post('/create-user', userController.createUser);
router.post('/find-user', userController.findUser);
router.get('/find-users', userController.findUsers);
router.get('/find-user/:id', userController.findUserId);
router.post('/upload-image/:id', multipartMiddleWare, userController.uploadImage);
router.get('/get-image/:image', userController.getImage);
router.put('/update-user/:id', userController.updateUser);
router.put('/status-user-on/:id', userController.statusUserOn);
router.put('/status-user-off/:id', userController.statusUserOff);
router.post('/create-service/:id', userController.createService);
router.post('/assign-worker', userController.assignWorker);
router.delete('/delete-user/:id', userController.deleteUser);
router.post('/alert-worker', userController.alertWorker);
router.get('/session-started/services/:id', userController.getServices);
router.put('/edit-service/:id', userController.editService);
router.post('/delete-service/:id', userController.deleteService);
router.post('/get-one-service', userController.getOneService);
router.post('/send-suggestion', userController.sendSuggestion);
router.get('/get-suggestions', userController.getSuggestions);
module.exports = router;