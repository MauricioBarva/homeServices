'use strict';
var User = require('../models/user');
var Service = require('../models/service');
var Worker = require('../models/worker');
var Suggestion = require('../models/suggestion');
var fs = require('fs');
var path = require('path');
var Controller = {
    createUser: function(datos, respuesta) {
        var user = new User();
        var datos = datos.body;
        user.user = datos.user;
        user.name = datos.name;
        user.surname = datos.surname;
        user.identification = datos.identification;
        user.birthdate = datos.birthdate;
        user.city = datos.city;
        user.address = datos.address;
        user.cellphone = datos.cellphone;
        user.password = datos.password;
        user.image = null;
        user.status = false;
        user.save((error, userStored) => {
            if (error) return respuesta.status(500).send({ message: 'Error al guardar el usuario.' });
            if (!userStored) return respuesta.status(404).send({ message: 'No se encontraron datos.' });
            return respuesta.status(200).send({ user: userStored });
        });
    },
    findUser: function(datos, respuesta) {
        var user = datos.body.user;
        var password = datos.body.password;
        User.findOne({ user: user, password: password }).exec((error, user) => {
            if (error) return respuesta.status(500).send({ message: 'Error al devolver los datos.' });
            if (!user) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ user: user });
        });

    },
    findUsers: function(datos, respuesta) {
        User.find().exec((error, user) => {
            if (error) return respuesta.status(500).send({ message: 'Error al devolver los datos.' });
            if (!user) return respuesta.status(404).send({ message: 'Los usuarios no existen.' });
            return respuesta.status(200).send({ user: user });
        });

    },
    findUserId: function(datos, respuesta) {
        var userId = datos.params.id;
        User.findById(userId, (error, user) => {
            if (error) return respuesta.status(500).send({ message: 'Error al devolver los datos.' });
            if (!user) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ user: user });
        });

    },
    statusUserOn: function(datos, respuesta) {
        var userId = datos.params.id;
        User.findByIdAndUpdate(userId, { status: true }, { new: true }, (error, userUpdated) => {
            if (error) return respuesta.status(500).send({ message: 'Error al actualizar los datos.' });
            if (!userUpdated) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ user: userUpdated });
        });
    },
    statusUserOff: function(datos, respuesta) {
        var userId = datos.params.id;
        User.findByIdAndUpdate(userId, { status: false }, { new: true }, (error, userUpdated) => {
            if (error) return respuesta.status(500).send({ message: 'Error al actualizar los datos.' });
            if (!userUpdated) return respuesta.status(404).send({ message: 'El usuario no existe.' });
            return respuesta.status(200).send({ user: userUpdated });
        });
    },
    uploadImage: function(req, res) {
        var userId = req.params.id;
        var message = "No se encontró la imagen";
        if (req.files) {
            var filePath = req.files.image.path;
            var filePathSplit = filePath.split('\\');
            var imageName = filePathSplit[1];
            var splitImageName = imageName.split('.');
            var extName = splitImageName[1];
            if (extName == 'jpg' || extName == 'png' || extName == 'jpeg') {

                User.findByIdAndUpdate(userId, { image: imageName }, { new: true }, (error, userUpdated) => {
                    if (error) return res.status(500).send({ message: 'Error al subir la imagen' });
                    if (!userUpdated) return res.status(404).send({ message: 'La imagen no existe' });
                    return res.status(200).send({ user: userUpdated, ext: extName });
                });
            } else {
                fs.unlink(filePath, error => {
                    return res.status(200).send({ message: 'Extensión de la imagen no soportada, ingrese jpg, png o jpeg.' });
                });
            }

        } else {
            return res.status(200).send({ message: message });
        }
    },
    getImage: function(req, res) {
        var imageName = req.params.image;
        var file_Path = './uploads-user/' + imageName;

        fs.exists(file_Path, (exists) => {
            if (exists) {
                res.status(200).sendFile(path.resolve(file_Path));
            } else {
                return res.status(200).send({ message: 'Img no existe' });
            }
        });
    },
    createService: function(req, res) {
        var userId = req.params.id;
        var service = new Service();
        var datos = req.body;
        service.user_address = datos.user_address;
        service.description_service = datos.description_service;
        service.skill_type = datos.skill_type;
        service.amount_money = datos.amount_money;

        User.findByIdAndUpdate(userId, { "$push": { services: service } }, { new: true }, (error, UserUpdated) => {
            //El error era porque trataba de de enviar un status antes de que se guardara el servicio
            if (error) return res.status(500).send({ message: 'Error al guardar el servicio.' });
            if (!UserUpdated) return res.status(404).send({ message: 'El servicio no existe' });

            return service.save((error, serviceStored) => {

                if (error) return res.status(500).send({ message: 'Error al crear el servicio' });
                if (!serviceStored) return res.status(404).send({ message: 'No se encontraron los datos del servicio a crear' });

                return res.status(200).send({ user: UserUpdated });
            })
        });


    },
    updateUser: function(req, res) {
        var update = req.body;
        var userId = req.params.id;

        User.findByIdAndUpdate(userId, update, { new: true }, (error, userUpdated) => {
            if (error) return res.status(500).send({ message: 'Error al actualizar los datos.' });
            if (!userUpdated) return res.status(404).send({ message: 'El usuario no existe.' });
            return res.status(200).send({ user: userUpdated });
        });
    },
    //Admin controllers
    assignWorker: function(req, res) {
        var serviceId = req.body.serviceId;
        var workerId = req.body.workerId;
        var userId = req.body.userId;

        function findWorker(fn) {
            Worker.findById(workerId)
                .then(worker => {
                    fn(worker);
                })
                .catch(error => res.status(500).send(error));
        }

        function changeService(idService, service) {
            User.findById(userId)
                .then(user => {
                    for (var i in user.services) {
                        if (user.services[i]._id == idService) {
                            user.services.splice(i, 1, service);
                            user.save();
                            return res.status(200).send(user.services);
                        }
                    }

                })
                .catch(error => res.status(500).send(error));
        }
        // aca
        Service.findById(serviceId)
            .then(service => {
                findWorker(function(worker) {
                    service.worker_info.push(worker);
                    service.save();
                    changeService(serviceId, service);

                })
            })
            .catch(error => res.status(500).send(error));



    },
    deleteUser: function(req, res) {
        var userId = req.params.id;

        User.findByIdAndDelete(userId, (error, userDeleted) => {
            if (error) return res.status(500).send({ message: 'Error al borrar usuario' });
            if (!userDeleted) return res.status(404).send({ message: 'El usuario no existe' });
            return res.status(200).send({ userDeleted: 'Usuario borrado: ', userDeleted });
        });
    },
    alertWorker: function(req, res) {
        var serviceId = req.body.serviceId;
        var workerId = req.body.workerId;

        function findWorker(fn) {
            Worker.findById(workerId)
                .then(worker => {
                    fn(worker);
                })
                .catch(error => res.status(500).send(error));
        }
        Service.findById(serviceId)
            .then(service => {
                findWorker(function(worker) {
                    worker.jobs.push(service);
                    worker.save();
                    return res.status(200).send(worker);
                });
            })
            .catch(error => res.status(500).send(error));
    },
    getServices: function(req, res) {
        var id = req.params.id;
        User.findById(id, (error, user) => {
            if (error) return res.status(500).send({ message: 'Error al devolver el cliente' });
            if (!user) return res.status(404).send({ meesage: 'El cliente no existe.' });
            return res.status(200).send(user.services);
        });
    },
    editService: function(req, res) {
        var userId = req.params.id;
        var serviceId = req.body.id;
        var datos = req.body;

        function findServiceToUpdate(service) {
            User.findById(userId)
                .then(user => {
                    for (var i in user.services) {
                        if (user.services[i]._id == serviceId) {
                            user.services.splice(i, 1, service);
                            user.save();
                            return res.status(200).send(user.services);
                        }
                    }
                })
                .catch(error => res.status(500).send(error));
        }
        Service.findByIdAndUpdate(serviceId)
            //Esto se puede simplificar como lo de arriba
            .then(serviceUpdated => {
                serviceUpdated.user_address = datos.user_address;
                serviceUpdated.description_service = datos.description_service;
                serviceUpdated.skill_type = datos.skill_type;
                serviceUpdated.amount_money = datos.amount_money;
                serviceUpdated.save();
                findServiceToUpdate(serviceUpdated);
            })
            .catch(error => res.status(500).send(error))
    },
    deleteService: function(req, res) {
        var userId = req.params.id;
        var serviceId = req.body.id;

        Service.findByIdAndDelete(serviceId).then(() => {
                return User.findById(userId);
            })
            .then(user => {
                for (var i in user.services) {
                    if (user.services[i]._id == serviceId) {
                        user.services.splice(i, 1);
                        user.save();
                        return res.status(200).send(user.services);
                    }
                }
            })
            .catch(error => res.status(500).send(error));
    },
    getOneService: function(req, res) {
        var id = req.body.id;
        Service.findById(id, (error, service) => {
            if (error) return res.status(500).send({ message: 'Error al devovler los datos' });
            if (!service) return res.status(404).send({ message: 'El servicio no existe' });
            return res.status(200).send({ service: service });
        });
    },
    sendSuggestion: function(req, res) {
        var suggestion = new Suggestion();
        var body = req.body;
        suggestion.name = body.name;
        suggestion.surname = body.surname;
        suggestion.subject = body.subject;
        suggestion.message = body.message;

        suggestion.save((error, suggestionStored) => {
            if (error) return res.status(500).send({ message: 'Error al guardar la sugerencia' });
            if (!suggestionStored) return res.status(404).send({ message: 'No se encontró la sugernecia' });
            return res.status(200).send({ suggestion: suggestionStored });
        });

    },
    getSuggestions: function(req, res) {
        Suggestion.find({}).sort().exec((error, suggestions) => {
            if (error) return res.status(500).send({ message: 'Error al devolver las sugerencias' });
            if (!suggestions) return res.status(404).send({ message: 'No se encontraron sugerencias' });
            return res.status(200).send({ suggestions: suggestions });
        });
    }

}

module.exports = Controller;