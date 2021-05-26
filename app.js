// Requires
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

// Inicializar variables
var app = express();

//CORS: resolver problemas de Cors
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

// Body Parser
// parse application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())
app.use(bodyParser.json({ limit: '16mb' }));
app.use(bodyParser.urlencoded({ limit: '16mb', extended: true }));

// Importar rutas
var appRoutes = require('./routes/app');
// var busquedaRoutes = require('./routes/busqueda');
var loginRoutes = require('./routes/login');
// var usuarioRoutes = require('./routes/usuario');
// var alarmaRoutes = require('./routes/alarma');
// var accionRoutes = require('./routes/accion')
// var eventosRoutes = require('./routes/eventos');
// var tipo_alarmaRoutes = require('./routes/tipo_alarma');
// var select_tiempoRoutes = require('./routes/select_tiempo');
// var select_alarmaRoutes = require('./routes/select_alarma');

// Conexión a la base de datos cambiar a la BD que toca
mongoose.connection.openUri('mongodb://localhost:27017/correduria-jose', (err, res) => {
    if (err) throw err;
    console.log('Base de datos: \x1b[32m%s\x1b[0m', 'online');
});

// Server index config
// var serveIndex = require('serve-index');
// app.use(express.static(__dirname + '/'))


// Rutas
// app.use('/usuario', usuarioRoutes);
app.use('/login', loginRoutes);
// app.use('/alarma', alarmaRoutes);
// app.use('/eventos', eventosRoutes);
// app.use('/accion',accionRoutes);
// app.use('/busqueda', busquedaRoutes);
// app.use('/tipo_alarma', tipo_alarmaRoutes);
// app.use('/select_tiempo', select_tiempoRoutes);
// app.use('/select_alarma', select_alarmaRoutes);
app.use('/', appRoutes);


// Escuchar peticiones
app.listen(3000, () => {
    console.log('Express server puerto 3000: \x1b[32m%s\x1b[0m', 'online');
});