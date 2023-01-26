/* ---------------------- Modulos ----------------------*/
import express from 'express';
import { Server as HttpServer } from 'http';
import { Server as IOServer } from "socket.io";
import dotenv from 'dotenv';
import session from "express-session";
import exphbs from 'express-handlebars'
import path from 'path'
import { config } from './src/utils/config.js';
import passport from 'passport'
import mongoose from 'mongoose';
import routerApp from './src/routes/routerApp.routes.js';
import { logger } from './src/utils/logger.config.js'
import UsuariosDaoMongoDb from './src/daos/usuarios/usuariosDaosMongoDb.js';
import MensajesDaoMongoDb from './src/daos/mensajes/mensajesDaoMogoDb.js';
import ProductosDaoMongoDb from './src/daos/productos/productosDaoMongoDb.js';

const USUARIOS = new UsuariosDaoMongoDb
const DB_MENSAJES = new MensajesDaoMongoDb
const DB_PRODUCTOS = new ProductosDaoMongoDb
dotenv.config();

/*============================[Base de Datos]============================*/
const strConn = config.mongodb.cnxStr
const conn = await mongoose.connect(strConn, config.mongodb.options)

/* ---------------------- Instancia Server ----------------------*/
const app = express();
const httpServer = new HttpServer(app);
const io = new IOServer(httpServer);

passport.serializeUser((usuario, done) => {
  done(null, usuario.username);
});

passport.deserializeUser((username, done) => {
  const existeUsuario = USUARIOS.getByUserName(username)
  done(null, existeUsuario);
});

//Motor de plantillas
app.set('views', 'src/views')
app.engine('hbs', exphbs.engine({
  defaultLayout: 'main',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  extname: 'hbs'
}));
app.set('view engine', '.hbs');

//Session Setup
app.use(session({
  // store: MongoStore,
  secret: process.env.SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 20000 //20 seg
  }
}))

app.use(passport.initialize());
app.use(passport.session());

// Session Middleware
function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next()
  } else {
    res.redirect('/login')
  }
}

/* ---------------------- Middlewares ----------------------*/
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
// app.use(express.static('./public'))

/* ---------------------- Rutas ----------------------*/
app.use('/', routerApp)

app.all('*', (req, res) => {
  res.status(404).json({
    status: 404,
    route: `${req.method} ${req.url}`,
    msg: `No implemented route`
  })
});

/* ---------------------- Servidor ----------------------------------------------------------*/
const PORT = process.env.PORT;
const server = httpServer.listen(PORT, () => {
  logger.info(`Servidor escuchando en puerto http://localhost:${PORT} - PID WORKER ${process.pid}`);
})
server.on('error', err => console.log(`error en server ${err}`));


/*============= Conexion Socket.io =============*/
io.on("connection", async (socket) => {
  const mensajesServer = await listarMensajesNormalizados();
  logger.info(`Nuevo cliente conectado -> ID: ${socket.id}`);
  io.sockets.emit("from-server-message", mensajesServer);


  socket.on("from-client-message", async (mensaje) => {
    await DB_MENSAJES.save(mensaje)
    const MENSAJES = await listarMensajesNormalizados();
    io.sockets.emit("from-server-message", MENSAJES);
  });

  // socket.on("from-client-product", async (product) => {
  //   // console.log(product)
  //   // await DB_PRODUCTOS.save(product);
  //   const PRODUCTOS = await DB_PRODUCTOS.getAll();
  //   console.log('desd DB Productos',PRODUCTOS)
  //   io.sockets.emit("from-server-product", PRODUCTOS);
  // });

});

/*=============== Normalizacion de datos ===============*/
import { normalize, schema, denormalize } from "normalizr";

const schemaAuthors = new schema.Entity("author", {}, { idAttribute: "email" });
const schemaMensaje = new schema.Entity(
  "post",
  { author: schemaAuthors },
  { idAttribute: "id" }
);
const schemaMensajes = new schema.Entity(
  "posts",
  { mensajes: [schemaMensaje] },
  { idAttribute: "id" }
);

const normalizarMensajes = (mensajesConId) =>
  normalize(mensajesConId, schemaMensajes);

async function listarMensajesNormalizados() {
  const mensajes = await DB_MENSAJES.getAll();
  const normalizados = normalizarMensajes({ id: "mensajes", mensajes });
  return normalizados;
}
