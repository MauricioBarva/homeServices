'use strict';

var express = require('express');
var WorkerController = require('../controllers/worker');
var WorkerRouter = express.Router();
var multipart = require('connect-multiparty');
var multipartMiddleWare = multipart({ uploadDir: './uploads-worker' });

WorkerRouter.post('/save-worker', WorkerController.createWorker);
WorkerRouter.get('/get-worker/:id', WorkerController.findWorkerId);
WorkerRouter.delete('/delete-worker/:id', WorkerController.deleteWorkerId);
WorkerRouter.get('/get-workers', WorkerController.getWorkers);
WorkerRouter.post('/upload-image-worker/:id', multipartMiddleWare, WorkerController.uploadImageWorker);
WorkerRouter.put('/update-worker/:id', WorkerController.updateWorker);
WorkerRouter.get('/image-worker/:image', WorkerController.getImageFile);
WorkerRouter.put('/status-worker-on/:id', WorkerController.statusWorkerOn);
WorkerRouter.put('/status-worker-off/:id', WorkerController.statusWorkerOff);
WorkerRouter.post('/find-worker', WorkerController.findWorker);

module.exports = WorkerRouter;