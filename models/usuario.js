var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var usuarioSchema = new Schema({
    codigo: {type: String},
    name: { type: String },
    apellido: {type: String},
    email: {type: String},
    rol: {type: Number},
    grupo_de_trabajo: {type: Number},
    password: {type: String},
    created_at: {type: Date},
    updated_at: {type: Date}
}, { collection: 'usuarios' });



module.exports = mongoose.model('Usuario', usuarioSchema);