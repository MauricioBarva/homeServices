'use strict';
var Worker = require('../models/worker');
var fs = require('fs');
var path = require('path');
var WorkerController = {
    createWorker: function(req, res) {
        var body = req.body;
        var worker = new Worker();
        worker.user = body.user;
        worker.name = body.name;
        worker.surname = body.surname;
        worker.identification = body.identification;
        worker.password = body.password;
        worker.birthdate = body.birthdate;
        worker.skills = body.skills;
        worker.experience = body.experience;
        worker.image = null;
        worker.status = false;
        worker.save((error, WorkerStored) => {
            if (error) return res.status(500).send({ message: 'Error al guardar el trabajador.' });
            if (!WorkerStored) return res.status(404).send({ message: 'No se encuentran los datos a guardar.' });
            return res.status(200).send({ worker: WorkerStored });

        });

    },
    findWorkerId: function(req, res) {
        var workerId = req.params.id;
        Worker.findById(workerId, (error, worker) => {
            if (error) return res.status(500).send({ message: 'Error al buscar el trabajador' });
            if (!worker) return res.status(404).send({ message: 'El trabajador no existe' });
            return res.status(200).send({ worker: worker });
        });
    },
    deleteWorkerId: function(req, res) {
        var workerId = req.params.id;

        Worker.findByIdAndDelete(workerId, (error, worker) => {
            if (error) return res.status(500).send({ message: 'Error al buscar el trabajador' });
            if (!worker) return res.status(404).send({ message: 'El trabajador no existe' });
            return res.status(200).send({ worker: worker });
        });
    },
    getWorkers: function(req, res) {
        Worker.find({}).sort().exec((error, workers) => {
            if (error) return res.status(500).send({ message: 'Error al buscar los trabajadores' });
            if (!workers) return res.status(404).send({ message: 'No existen trabajadores' });
            return res.status(200).send({ workers: workers });
        });
    },
    updateWorker: function(req, res) {
        var workerId = req.params.id;
        var update = req.body;

        Worker.findByIdAndUpdate(workerId, update, { new: true }, (error, workerUpdated) => {
            if (error) return res.status(500).send({ message: 'Error al actualizar el trabajador' });
            if (!workerUpdated) return res.status(404).send({ message: 'El trabajador no existe' });
            return res.status(200).send({ worker: workerUpdated });
        });
    },
    uploadImageWorker: function(req, res) {
        var workerId = req.params.id;
        var message = 'No se encontró la imagen..';
        if (req.files) {
            var file_path = req.files.image.path;
            var split_path = file_path.split('\\');
            var img_name = split_path[1];
            var split_img = img_name.split('.');
            var ext_name = split_img[1];
            if (ext_name == 'jpg' || ext_name == 'png' || ext_name == 'jpeg') {
                Worker.findByIdAndUpdate(workerId, { image: img_name }, { new: true }, (error, workerUpdated) => {
                    if (error) return res.status(500).send({ message: 'Error al guardar la imagen' });
                    if (!workerUpdated) return res.status(404).send({ message: 'No existe el trabajador' });
                    return res.status(200).send({ worker: workerUpdated, ext: ext_name });
                });
            } else {
                fs.unlink(file_path, error => {
                    return res.status(200).send({ message: 'Tipo de extensión de imagen no válida. jpg, png o jpeg.' });
                });
            }
        } else {
            return res.status(200).send({ message: message });
        }
    },
    getImageFile: function(req, res) {
        var imgName = req.params.image;
        var imgPath = './uploads-worker/' + imgName;

        fs.exists(imgPath, (exists) => {
            if (exists) {
                return res.status(200).sendFile(path.resolve(imgPath));
            } else {
                return res.status(200).send({ message: 'La imagen no existe' });
            }
        });
    },
    statusWorkerOn: function(datos, respuesta) {
        var workerId = datos.params.id;
        Worker.findByIdAndUpdate(workerId, { status: true }, { new: true }, (error, workerUpdated) => {
            if (error) return respuesta.status(500).send({ message: 'Error al actualizar los datos.' });
            if (!workerUpdated) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ worker: workerUpdated });
        });
    },
    statusWorkerOff: function(datos, respuesta) {
        var workerId = datos.params.id;
        Worker.findByIdAndUpdate(workerId, { status: false }, { new: true }, (error, workerUpdated) => {
            if (error) return respuesta.status(500).send({ message: 'Error al actualizar los datos.' });
            if (!workerUpdated) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ worker: workerUpdated });
        });
    },
    findWorker: function(datos, respuesta) {
        var user = datos.body.user;
        var password = datos.body.password;
        Worker.findOne({ user: user, password: password }).exec((error, user) => {
            if (error) return respuesta.status(500).send({ message: 'Error al devolver los datos.' });
            if (!user) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ user: user });
        });

    }
}

module.exports = WorkerController;