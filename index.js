const express = require('express');// paquete para hacer servidor
const cors = require('cors');//para requerir cors porque no nos deja llamar en el mismo servidor(no permite origen cruzado) con esto evitamos ese error
const bunyan = require('bunyan'); // para hacer consolelog más completos(hora, fecha y muchos más detalles)
const helmet = require('helmet'); // es un middleware de Node.js que ayuda a mejorar la seguridad de las aplicaciones Express configurando cabeceras HTTP


require('dotenv').config();//porque necesitamamos decirle que use esta configuracion de archivos para usar en este archivo

const usuarios = require('./router/usuarioRouter'); //importamos la ruta creada en usuariosRouter.js

const restaurantes =require('./router/restauranteRouter');//importamos la ruta creada en restaurantesRouter.js

const logger = bunyan.createLogger({name: 'Server'});//para verlo más detallado en la terminal, en vez de  usar console.log usamos consola.info
const app = express();


app.use(helmet());//  para configurar las cabeceras de seguridad
app.use(cors());//para decir que app use cors y poder llamar cruzado de un servidor a otro
app.use(express.json()); // para parsear el body de las solicitudes para poder usar archivos.json dedsde el cliente
app.use('/usuarios', usuarios);//para usar ruta usuarios, para decirle que a esta ruta use este archivo de ruta, al poner http://localhost:3000/usuarios muestra todos los usuarios
app.use('/restaurantes', restaurantes); //para usar ruta restaurantes


// Middleway para manejar 404            
app.use((req,res)=>{

    res.status(404).send('<h1>Ruta no encontrada (not found)</h1>')
})                            

// Middleway para manejar 500 
app.use((err,req,res)=>{
    logger.error(err)
    res.status(500).send('<h1> Error en el servidor: '+err+' </h1>')
})

// Gestion de errores
app.get('/' , (req , res , next) =>{
    try {

        res.status(200).json('Haciendo GET en /')
        
    } catch (error) {
        
        next(error)

    }
})
app.use((err , req , res , next)=>{
    res.status(500).json('Error en la API')
})

//paralevantar el servidor:
app.listen(process.env.PORT,()=>{
    logger.info('Servidor Levantado');//lo que vemos en terminal
})
