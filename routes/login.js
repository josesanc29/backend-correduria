var express = require('express');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var SEED = require('../config/config').SEED;
var app = express();
var Usuario = require('../models/usuario');
var mdAutenticacion = require('../middlewares/authentication');

// ==========================================
//  Renovar Token
// ==========================================
app.get('/renuevatoken', mdAutenticacion.verificaToken, (req, res) => {

    var token = jwt.sign({ usuario: req.usuario }, { expiresIn: 14400 }); // 4 horas

    res.status(200).json({
        ok: true,
        token: token
    });

});

// ==========================================
//  Autenticación normal
// ==========================================
app.post('/', (req, res) => {

    var body = req.body;

    Usuario.findOne({ email: body.email }, (err, usuarioDB) => {

        if (err) {
            return res.status(500).json({
                ok: false,
                mensaje: 'Error al buscar usuario',
                errors: err
            });
        }

        if (!usuarioDB) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas',
                errors: err
            });
        }

        if (!body.password, !usuarioDB.password) {
            return res.status(400).json({
                ok: false,
                mensaje: 'Credenciales incorrectas - password',
                errors: err
            });
        }

        // Crear un token!!!
        usuarioDB.password = ':)';

        var token = jwt.sign({ usuario: usuarioDB },SEED, { expiresIn: 14400 }); // 4 horas

        res.status(200).json({
            ok: true,
            mensaje:'path login correcto',
            usuario: usuarioDB,
            token: token,
            id: usuarioDB._id,
            menu: obtenerMenu(usuarioDB.rol)
        });

    })
});

function obtenerMenu(ROL) {

    var menu = [{
            titulo: 'Principal',
            icono: 'mdi mdi-gauge',
            submenu: [
                { titulo: 'Dashboard', url: '/dashboard' },
            ]
        },
        {
            titulo: 'Mantenimientos',
            icono: 'mdi mdi-folder-lock-open',
            submenu: [
                { titulo: 'Alarmas', url: '/alarma' },
                { titulo: 'Eventos', url: '/eventos' }
            ]
        }
    ];

    if (ROL === 1) {
        menu[1].submenu.unshift({ titulo: 'Usuarios', url: '/usuario' },
        { titulo: 'Historial de Incidencias', url: '/historial'},
        { titulo: 'Geolocalización', url: '/geo'});
        // menu[1].submenu.unshift();
    }


    return menu;

}

module.exports = app;