const mysql = require('mysql2');
const bunyan = require('bunyan');

const consoleLogBD = bunyan.createLogger({name: 'Console log de la BD'});

const conexion = mysql.createConnection({
    host: process.env.HOST_BD,
    user: process.env.USER_BD,
    password: process.env.PASS_BD,
    database: process.env.BASE_BD,
    port: process.env.PORT_DB,

});
conexion.connect (err =>{

    if (err) {
        
        consoleLogBD.error(err)
    }
    consoleLogBD.info('Conectado el servidor OK')
})

module.exports = conexion;
